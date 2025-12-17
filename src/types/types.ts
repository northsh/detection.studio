export type FileType = "sigma" | "correlation" | "filter" | "pipeline";

export interface FileItem {
    id: string;
    name: string;
    content: string;
    type: FileType;
    active?: boolean;
}

export type Sigma = {
    logsource: {
        category: string;
        product: string;
        service: string;
    };
    detection: {
        condition: {
            selection: string;
            condition: string;
        };
    };
    id: string;
};
