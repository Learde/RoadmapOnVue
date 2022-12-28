const stringEscape = (str, len, end = "...") => {
    return str?.substring(0, len) + (str.length > len ? end : "");
};

export { stringEscape };
