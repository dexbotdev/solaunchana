function truncateString(str: string, num: number) {
    if (str.length > num) {
        return str.slice(0, 14) + '...' + str.slice(-14);
    } else {
        return str;
    }
}

export { truncateString };
