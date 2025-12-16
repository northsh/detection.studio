import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SigmaConverter } from "../SigmaConverter";
import * as workerApi from "../worker/workerApi";
import type { WorkerStatus } from "../worker/workerApi";

// Mock the worker API
vi.mock("../worker/workerApi");

// Mock SIGMA_TARGETS
vi.mock("@/types/SIEMs", () => ({
  SIGMA_TARGETS: new Set(["splunk", "elastic", "qradar"]),
}));

const mockWorkerApi = vi.mocked(workerApi);

describe("SigmaConverter", () => {
  let converter: SigmaConverter;
  let mockStatusListener: (status: WorkerStatus) => void;
  let statusListenerCleanup: (() => void) | null = null;

  const mockInitialStatus: WorkerStatus = {
    ready: false,
    pyodideReady: false,
    installedBackends: [],
  };

  const mockReadyStatus: WorkerStatus = {
    ready: true,
    pyodideReady: true,
    installedBackends: ["splunk"],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock worker API functions
    mockWorkerApi.getWorkerStatus.mockResolvedValue(mockInitialStatus);
    mockWorkerApi.addStatusListener.mockImplementation((listener) => {
      mockStatusListener = listener;
      statusListenerCleanup = vi.fn();
      return statusListenerCleanup;
    });
    mockWorkerApi.installBackend.mockResolvedValue({ success: true });
    mockWorkerApi.convert.mockResolvedValue({ result: "converted query", error: null });
  });

  afterEach(() => {
    if (converter) {
      converter.dispose();
    }
    statusListenerCleanup = null;
  });

  describe("Constructor", () => {
    it("should initialize with correct default state", async () => {
      converter = new SigmaConverter();

      expect(mockWorkerApi.addStatusListener).toHaveBeenCalledWith(expect.any(Function));
      expect(mockWorkerApi.getWorkerStatus).toHaveBeenCalled();
      expect(converter.isReady()).toBe(false);
    });

    it("should handle constructor errors gracefully", async () => {
      mockWorkerApi.addStatusListener.mockImplementation(() => {
        throw new Error("Worker setup failed");
      });

      expect(() => new SigmaConverter()).toThrow("Worker setup failed");
    });

    it("should handle getWorkerStatus errors gracefully", async () => {
      mockWorkerApi.getWorkerStatus.mockRejectedValue(new Error("Status fetch failed"));
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      converter = new SigmaConverter();

      // Wait for async refreshStatus to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(consoleSpy).toHaveBeenCalledWith("Error refreshing worker status:", expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe("Status Management", () => {
    beforeEach(() => {
      converter = new SigmaConverter();
    });

    it("should update status when worker status changes", () => {
      const newStatus: WorkerStatus = {
        ready: true,
        pyodideReady: true,
        installedBackends: ["splunk"],
      };

      mockStatusListener(newStatus);

      expect(converter.isReady()).toBe(true);
      expect(converter.getStatus()).toEqual(newStatus);
    });

    it("should notify status listeners", () => {
      const listener = vi.fn();
      const cleanup = converter.addStatusListener(listener);

      // Should be called immediately with current status
      expect(listener).toHaveBeenCalledWith(mockInitialStatus);

      // Should be called when status updates
      const newStatus = mockReadyStatus;
      mockStatusListener(newStatus);

      expect(listener).toHaveBeenCalledWith(newStatus);
      expect(listener).toHaveBeenCalledTimes(2);

      cleanup();
    });

    it("should notify readiness listeners", () => {
      const listener = vi.fn();
      const cleanup = converter.addReadinessListener(listener);

      // Should be called immediately with current readiness
      expect(listener).toHaveBeenCalledWith(false);

      // Should be called when readiness changes
      mockStatusListener(mockReadyStatus);

      expect(listener).toHaveBeenCalledWith(true);
      expect(listener).toHaveBeenCalledTimes(2);

      cleanup();
    });

    it("should remove listeners when cleanup function is called", () => {
      const statusListener = vi.fn();
      const readinessListener = vi.fn();

      const statusCleanup = converter.addStatusListener(statusListener);
      const readinessCleanup = converter.addReadinessListener(readinessListener);

      // Clean up listeners
      statusCleanup();
      readinessCleanup();

      // Update status - listeners should not be called
      mockStatusListener(mockReadyStatus);

      expect(statusListener).toHaveBeenCalledTimes(1); // Only initial call
      expect(readinessListener).toHaveBeenCalledTimes(1); // Only initial call
    });
  });

  describe("Conversion", () => {
    beforeEach(() => {
      converter = new SigmaConverter();
      // Set up ready status
      mockStatusListener(mockReadyStatus);
    });

    it("should convert successfully with valid input", async () => {
      const rule = "title: Test Rule\ndetection:\n  condition: selection";
      const target = "splunk";

      const result = await converter.convert(rule, target);

      expect(mockWorkerApi.convert).toHaveBeenCalledWith({
        rule,
        target,
        pipelines: [],
        pipelineYmls: [],
        filterYml: "",
        format: "",
        correlationMethod: "",
        backendOptions: {},
      });

      expect(result).toEqual({
        query: "converted query",
        error: undefined,
      });
    });

    it("should handle SSR environment", async () => {
      // Mock SSR environment
      const originalWorker = global.Worker;
      // @ts-ignore
      delete global.Worker;

      const result = await converter.convert("rule", "splunk");

      expect(result).toEqual({
        query: "",
        error: "Conversion not available during server-side rendering",
      });

      global.Worker = originalWorker;
    });

    it("should handle unsupported target", async () => {
      const result = await converter.convert("rule", "unsupported");

      expect(result).toEqual({
        query: "",
        error: "Unsupported target: unsupported",
      });
    });

    it("should install backend if not already installed", async () => {
      const rule = "title: Test Rule";
      const target = "elastic";

      // Set status with no installed backends
      mockStatusListener({
        ready: true,
        pyodideReady: true,
        installedBackends: [],
      });

      await converter.convert(rule, target);

      expect(mockWorkerApi.installBackend).toHaveBeenCalledWith(target);
      expect(mockWorkerApi.convert).toHaveBeenCalled();
    });

    it("should handle backend installation failure", async () => {
      mockWorkerApi.installBackend.mockResolvedValue({
        success: false,
        error: "Installation failed",
      });

      const result = await converter.convert("rule", "elastic");

      expect(result).toEqual({
        query: "",
        error: "Failed to install backend: Installation failed",
      });
    });

    it("should handle conversion errors from worker", async () => {
      mockWorkerApi.convert.mockResolvedValue({
        result: null,
        error: "Conversion failed",
      });

      const result = await converter.convert("rule", "splunk");

      expect(result).toEqual({
        query: "",
        error: "Conversion failed",
      });
    });

    it("should handle worker API exceptions", async () => {
      mockWorkerApi.convert.mockRejectedValue(new Error("Worker crashed"));
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const result = await converter.convert("rule", "splunk");

      expect(result).toEqual({
        query: "",
        error: "Worker crashed",
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error during Pyodide Sigma conversion:",
        expect.any(Error),
      );
      consoleSpy.mockRestore();
    });

    it("should pass all parameters to worker API", async () => {
      const params = {
        rule: "test rule",
        target: "splunk",
        pipeline: ["normalize"],
        pipelineYmls: ["pipeline: test"],
        filterYml: "filter: test",
        format: "json",
        correlationMethod: "and",
        backendOptions: { timeout: 30 },
      };

      await converter.convert(
        params.rule,
        params.target,
        params.pipeline,
        params.pipelineYmls,
        params.filterYml,
        params.format,
        params.correlationMethod,
        params.backendOptions,
      );

      expect(mockWorkerApi.convert).toHaveBeenCalledWith({
        rule: params.rule,
        target: params.target,
        pipelines: params.pipeline,
        pipelineYmls: params.pipelineYmls,
        filterYml: params.filterYml,
        format: params.format,
        correlationMethod: params.correlationMethod,
        backendOptions: params.backendOptions,
      });
    });
  });

  describe("Dispose", () => {
    it("should clean up resources when disposed", () => {
      converter = new SigmaConverter();
      const statusListener = vi.fn();
      const readinessListener = vi.fn();

      converter.addStatusListener(statusListener);
      converter.addReadinessListener(readinessListener);

      expect(statusListenerCleanup).toBeTruthy();

      converter.dispose();

      expect(statusListenerCleanup).toHaveBeenCalled();

      // Verify listeners are cleared
      mockStatusListener(mockReadyStatus);
      expect(statusListener).toHaveBeenCalledTimes(1); // Only initial call
      expect(readinessListener).toHaveBeenCalledTimes(1); // Only initial call
    });

    it("should handle dispose when cleanup listener is null", () => {
      converter = new SigmaConverter();
      converter["cleanupListener"] = null;

      expect(() => converter.dispose()).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      converter = new SigmaConverter();
    });

    it("should handle empty rule string", async () => {
      await converter.convert("", "splunk");

      expect(mockWorkerApi.convert).toHaveBeenCalledWith(
        expect.objectContaining({
          rule: "",
        }),
      );
    });

    it("should handle null/undefined backend options", async () => {
      mockStatusListener(mockReadyStatus);

      await converter.convert("rule", "splunk", [], [], "", "", "", undefined as any);

      expect(mockWorkerApi.convert).toHaveBeenCalledWith(
        expect.objectContaining({
          backendOptions: {},
        }),
      );
    });

    it("should return copy of status object", () => {
      const status1 = converter.getStatus();
      const status2 = converter.getStatus();

      expect(status1).toEqual(status2);
      expect(status1).not.toBe(status2); // Should be different objects
    });

    it("should handle rapid status updates", () => {
      const listener = vi.fn();
      converter.addStatusListener(listener);

      // Simulate rapid status updates
      for (let i = 0; i < 5; i++) {
        mockStatusListener({
          ready: i % 2 === 0,
          pyodideReady: true,
          installedBackends: [`backend${i}`],
        });
      }

      expect(listener).toHaveBeenCalledTimes(6); // Initial + 5 updates
    });
  });

  describe("Concurrent Operations", () => {
    beforeEach(() => {
      converter = new SigmaConverter();
      mockStatusListener(mockReadyStatus);
    });

    it("should handle concurrent conversions", async () => {
      const promises = Array.from({ length: 3 }, (_, i) => converter.convert(`rule${i}`, "splunk"));

      const results = await Promise.all(promises);

      expect(results).toHaveLength(3);
      results.forEach((result) => {
        expect(result.query).toBe("converted query");
        expect(result.error).toBeUndefined();
      });
    });

    it("should handle concurrent backend installations", async () => {
      // Set status with no installed backends
      mockStatusListener({
        ready: true,
        pyodideReady: true,
        installedBackends: [],
      });

      const promises = Array.from({ length: 3 }, () => converter.convert("rule", "elastic"));

      await Promise.all(promises);

      // Should attempt to install backend for each conversion
      expect(mockWorkerApi.installBackend).toHaveBeenCalledTimes(3);
    });
  });
});
