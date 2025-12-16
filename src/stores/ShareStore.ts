import { defineStore } from "pinia";
import type { Workspace } from "./WorkspaceStore";
import { createSigmaStore } from "@/stores/CreateSigmaStore";
import { createFileStore } from "@/stores/CreateFileStore";
import { createDataStore } from "@/stores/CreateDataStore";

export interface WorkspaceShare {
  workspace: SerializedWorkspace;
  timestamp: number;
  version: string;
}

// Match the persistent state serialization type
type SerializedWorkspace = {
  id: string;
  name: string;
  plan: string;
  sigmaState?: any;
  fileState?: any;
  dataState?: any;
};

export const useWorkspaceSharingStore = defineStore("workspaceSharing", () => {
  // Serialize workspace for sharing
  function serializeWorkspace(workspace: Workspace): SerializedWorkspace {
    // Get store states if available
    const sigmaState = workspace.sigmaStore()?.$state;
    const fileState = workspace.fileStore()?.$state;
    const dataState = workspace.dataStore()?.$state;

    return {
      id: workspace.id,
      name: workspace.name,
      plan: workspace.plan,
      sigmaState,
      fileState,
      dataState,
    };
  }

  // Deserialize workspace from shared data
  function deserializeWorkspace(serialized: SerializedWorkspace): Workspace {
    // Generate a new ID for the imported workspace to prevent duplicates
    const newId = Math.random().toString(36).substring(7);

    // Create new store instances with the new ID
    const sigmaStore = createSigmaStore(newId);
    const fileStore = createFileStore(newId);
    const dataStore = createDataStore(newId);

    // Restore store states if available
    if (serialized.fileState) {
      fileStore().$state = serialized.fileState;
    }
    if (serialized.sigmaState) {
      sigmaStore().$state = serialized.sigmaState;
    }
    if (serialized.dataState) {
      dataStore().$state = serialized.dataState;
    }

    return {
      id: newId,
      name: `${serialized.name} (Imported)`,
      plan: serialized.plan,
      sigmaStore,
      fileStore,
      dataStore,
    };
  }

  // Generate shareable URL
  function generateShareableUrl(workspace: Workspace): string {
    const serialized = serializeWorkspace(workspace);

    const shareData: WorkspaceShare = {
      workspace: serialized,
      timestamp: Date.now(),
      version: "1.0",
    };

    // Convert to base64url (URL-safe base64)
    const base64url = btoa(JSON.stringify(shareData))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    // Generate the URL with the encoded data
    const baseUrl = window.location.origin;
    return `${baseUrl}/#${base64url}`;
  }

  // Reconstruct workspace from URL parameter
  function reconstructFromUrl(shareParam: string): Workspace {
    // Convert from base64url back to regular string
    const base64 = shareParam.replace(/-/g, "+").replace(/_/g, "/");

    // Add back padding if needed
    const padding = base64.length % 4;
    const paddedBase64 = padding ? base64 + "=".repeat(4 - padding) : base64;

    const shareData: WorkspaceShare = JSON.parse(atob(paddedBase64));

    // Check version compatibility if needed
    if (shareData.version !== "1.0") {
      console.warn("Workspace share version mismatch");
    }

    return deserializeWorkspace(shareData.workspace);
  }

  return {
    generateShareableUrl,
    reconstructFromUrl,
    serializeWorkspace, // Exposed for testing
    deserializeWorkspace, // Exposed for testing
  };
});
