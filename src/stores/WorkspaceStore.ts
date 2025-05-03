import {defineStore, type StoreDefinition} from "pinia";
import {computed, type ComputedRef, onMounted, type Ref, ref} from "vue";
import {createSigmaStore} from "@/stores/CreateSigmaStore";
import {createFileStore, type FileStore} from "@/stores/CreateFileStore";
import {createDataStore, type DataStoreInterface} from "@/stores/CreateDataStore";
import {useWorkspaceSharingStore} from "@/stores/ShareStore.ts";
import type {SigmaStore} from "@/types/SigmaStore.ts";

export type Workspace = {
    id: string;
    name: string;
    plan: string;
    fileStore: StoreDefinition<string, FileStore>;
    sigmaStore: StoreDefinition<string, SigmaStore>;
    dataStore: StoreDefinition<string, DataStoreInterface>;
}

type SerializedWorkspace = Omit<Workspace, 'sigmaStore' | 'fileStore' | 'dataStore'>;

export const useWorkspaceStore = defineStore('workspace', () => {
    const sidebarOpen = ref(true);
    const availableWorkspaces = ref<Workspace[]>([]);
    const currentWorkspaceID: Ref<string> = ref('default');

    /**
     * Inspect the hash of the current URL to determine the workspace to load
     */
    const shareStore = useWorkspaceSharingStore();

    function loadWorkspaceFromHash() {
        const hash = window.location.hash.slice(1);
        if (!hash) return;

        const workspace = shareStore.reconstructFromUrl(hash);

        if (workspace) {
            // Check if a workspace with the same name already exists
            const existingName = availableWorkspaces.value.some(w => 
                w.name.replace(' (Imported)', '') === workspace.name.replace(' (Imported)', ''));
            
            // Add a counter to the name if necessary
            if (existingName) {
                const baseNameMatch = workspace.name.match(/(.*?)( \(\d+\))?( \(Imported\))?$/);
                const baseName = baseNameMatch ? baseNameMatch[1] : workspace.name;
                
                let counter = 1;
                let newName = `${baseName} (${counter})`;
                
                while (availableWorkspaces.value.some(w => 
                    w.name.replace(' (Imported)', '') === newName)) {
                    counter++;
                    newName = `${baseName} (${counter})`;
                }
                
                workspace.name = `${newName} (Imported)`;
            }
            
            availableWorkspaces.value.push(workspace);
            setCurrentWorkspace(workspace);
            removeHash();
        }
    }

    function removeHash() {
        var scrollV, scrollH, loc = window.location;
        if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
        else {
            // Prevent scrolling by storing the page's current scroll offset
            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;

            loc.hash = "";

            // Restore the scroll offset, should be flicker free
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
        }
    }

    onMounted(() => loadWorkspaceFromHash());

    // Initialize default workspaces
    function initializeDefaultWorkspaces() {
        const id = Math.random().toString(36).substring(7);
        availableWorkspaces.value = [{
            id,
            name: 'Default',
            plan: 'free',
            fileStore: createFileStore(id),
            sigmaStore: createSigmaStore(id),
            dataStore: createDataStore(id),
        }];

        setCurrentWorkspace(availableWorkspaces.value[0]);
    }

    onMounted(() => {
        // Initialize on store creation if empty
        if (availableWorkspaces.value.length === 0) {
            initializeDefaultWorkspaces();
        }
    })

    function setCurrentWorkspace(workspace: Workspace) {
        currentWorkspaceID.value = workspace.id;
    }

    function newWorkspace(
        name: string,
        plan: string,
    ): Workspace {
        const id = Math.random().toString(36).substring(7);
        const newWorkspace: Workspace = {
            id,
            name,
            plan,
            fileStore: createFileStore(id),
            sigmaStore: createSigmaStore(id),
            dataStore: createDataStore(id),
        };

        availableWorkspaces.value.push(newWorkspace);
        setCurrentWorkspace(newWorkspace)

        return newWorkspace;
    }

    const currentWorkspace: ComputedRef<Workspace> = computed(() =>
        availableWorkspaces.value.find(w => w.id === currentWorkspaceID.value)
        ?? availableWorkspaces.value[0]
        ?? newWorkspace('Default', 'free')
    );

    function deleteWorkspace(workspaceId: string) {
        // Prevent deleting the last workspace
        if (availableWorkspaces.value.length <= 1) {
            return false;
        }

        // Filter out the workspace with the given ID
        availableWorkspaces.value = availableWorkspaces.value.filter(w => w.id !== workspaceId);

        // If current workspace is deleted, set to another available workspace
        if (currentWorkspaceID.value === workspaceId && availableWorkspaces.value.length > 0) {
            setCurrentWorkspace(availableWorkspaces.value[0]);
        }

        return true;
    }

    function renameWorkspace(workspaceId: string, newName: string) {
        const workspace = availableWorkspaces.value.find(w => w.id === workspaceId);
        if (workspace) {
            workspace.name = newName;
            return true;
        }
        return false;
    }

    return {
        sidebarOpen,
        currentWorkspaceID,
        availableWorkspaces,
        setCurrentWorkspace,
        newWorkspace,
        currentWorkspace,
        deleteWorkspace,
        renameWorkspace
    };
}, {
    persist: {
        serializer: {
            serialize: (state) => {
                return JSON.stringify({
                    ...state,
                    availableWorkspaces: state.availableWorkspaces
                });
            },
            deserialize: (state) => {
                const parsed = JSON.parse(state);
                const reconstructedWorkspaces = parsed.availableWorkspaces.map((w: SerializedWorkspace) => ({
                    ...w,
                    sigmaStore: createSigmaStore(w.id),
                    fileStore: createFileStore(w.id),
                    dataStore: createDataStore(w.id),
                }));

                return {
                    ...parsed,
                    availableWorkspaces: reconstructedWorkspaces
                };
            }
        }
    }
});
