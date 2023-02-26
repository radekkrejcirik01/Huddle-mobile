export const format = (value: string): string => {
    if (value?.length === 1) {
        return `0${value}`;
    }
    return value;
};
