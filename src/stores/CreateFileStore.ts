import { defineStore, type StoreDefinition } from "pinia";
import { type Ref, ref } from "vue";
import type { FileItem } from "@/types/types.ts";

export interface FileStore {
  files: Ref<FileItem[]>;
  openFiles: Ref<string[]>;
  currentlyOpenFileId: Ref<string | null>;
  fileBeingEdited: Ref<string | null>;
  editingFileName: Ref<string>;

  getFile: (id: string | null) => FileItem | undefined;
  addFile: (file: Omit<FileItem, "id">) => string;
  updateFile: (id: string, content: string) => void;
  deleteFile: (id: string) => void;
  duplicateFile: (id: string) => string | undefined;
  startRename: (id: string | null) => void;
  saveRename: () => void;
  cancelRename: () => void;
  openFile: (id: string) => void;
  closeFile: (id: string) => void;
  closeAllOpenFiles: () => void;
  getActiveFile: () => FileItem | undefined;
}

export function createFileStore(id: string): StoreDefinition<string, FileStore> {
  // @ts-ignore
  return defineStore(
    id + "-file",
    (): FileStore => {
      // State
      const files = ref<FileItem[]>([]);
      const openFiles = ref<string[]>([]);
      const currentlyOpenFileId = ref<string | null>(null);
      const fileBeingEdited = ref<string | null>(null);
      const editingFileName = ref<string>("");

      function getFile(id: string | null = currentlyOpenFileId.value): FileItem | undefined {
        return files.value.find((f: FileItem) => f.id === id);
      }

      // File Management
      function addFile(file: Omit<FileItem, "id">): string {
        const id = Math.random().toString(36).substring(2, 9);
        files.value.push({ ...file, id });
        openFile(id);
        sortFiles();
        return id;
      }

      function updateFile(id: string, content: string) {
        const file = files.value.find((f: FileItem) => f.id === id);
        if (file) {
          file.content = content;

          // Update the active file if it's the one being edited
          if (file.active) {
            setActiveFile(id);
          }
        }
      }

      function deleteFile(id: string) {
        const index = files.value.findIndex((f: FileItem) => f.id === id);
        if (index !== -1) {
          closeFile(id);
          files.value.splice(index, 1);
          sortFiles();

          // Set the active file to the first open file in the list
          if (currentlyOpenFileId.value === id) {
            currentlyOpenFileId.value = openFiles.value[0] || null;
          }
        }
      }

      function duplicateFile(id: string) {
        const file = files.value.find((f: FileItem) => f.id === id);
        if (file) {
          return addFile({
            name: `${file.name} (copy)`,
            content: file.content,
            type: file.type,
          });
        }
      }

      // File Operations
      function startRename(id: string | null) {
        if (id === null) {
          fileBeingEdited.value = null;
          editingFileName.value = "";
          return;
        }

        const file = files.value.find((f: FileItem) => f.id === id);
        if (file) {
          fileBeingEdited.value = id;
          editingFileName.value = file.name;
        }
      }

      function saveRename() {
        if (fileBeingEdited.value && editingFileName.value.trim()) {
          const file = files.value.find((f: FileItem) => f.id === fileBeingEdited.value);
          if (file) {
            file.name = editingFileName.value
              .trim()
              .replace(/\.yml$/, "")
              .replace(/\.yaml$/, "")
              .replace(/\s+/g, "_");
            sortFiles();
          }
        }
        fileBeingEdited.value = null;
        editingFileName.value = "";
      }

      function cancelRename() {
        fileBeingEdited.value = null;
        editingFileName.value = "";
      }

      // File State Management
      function openFile(id: string) {
        if (!openFiles.value.includes(id)) {
          openFiles.value.push(id);
        }
        setActiveFile(id);
      }

      function closeFile(id: string) {
        const index = openFiles.value.indexOf(id);
        if (index !== -1) {
          openFiles.value.splice(index, 1);
          if (currentlyOpenFileId.value === id) {
            currentlyOpenFileId.value = openFiles.value[openFiles.value.length - 1] || null;
          }
        }
      }

      function closeAllOpenFiles() {
        openFiles.value = [];
        currentlyOpenFileId.value = null;
      }

      function setActiveFile(id: string) {
        currentlyOpenFileId.value = id;
        files.value = files.value.map((f: FileItem) => ({
          ...f,
          active: f.id === id,
        }));
      }

      // Utilities
      const sortFiles = () => {
        files.value.sort((a: FileItem, b: FileItem) => a.name.localeCompare(b.name));
      };

      function getActiveFile(): FileItem | undefined {
        return files.value.find((f: FileItem) => f.id === currentlyOpenFileId.value);
      }

      return {
        // State
        files,
        openFiles,
        currentlyOpenFileId,
        fileBeingEdited,
        editingFileName,

        // Methods
        getFile,
        addFile,
        updateFile,
        deleteFile,
        duplicateFile,
        startRename,
        saveRename,
        cancelRename,
        openFile,
        closeFile,
        closeAllOpenFiles,
        getActiveFile,
      };
    },
    {
      undo: {
        omit: ["currentlyOpenFileId", "fileBeingEdited", "editingFileName", "openFiles"],
      },
      persist: true,
    },
  );
}
