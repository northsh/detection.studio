import { type Completion } from "./types.ts";

const optionsFromKeys = (obj: object, icon?: string): Completion[] =>
    Object.keys(obj).map((tag) => ({ label: tag, icon }));

export { optionsFromKeys };
