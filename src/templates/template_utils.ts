export const indentString = (str: string, count: number, indent: string = " ") =>
    str.replace(/^/gm, indent.repeat(count));
export const dedentString = (str: string) => {
    const match = str.match(/^\s+/);
    if (!match) {
        return str;
    }
    const indent = match[0];
    return str.replace(new RegExp("^" + indent, "gm"), "");
};
