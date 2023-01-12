const format = (value: string): string => {
    if (value?.length === 1) {
        return `0${value}`;
    }
    return value;
};

export const getDateAndTime = (): string => {
    const year = new Date().getFullYear();
    const month = format((new Date().getMonth() + 1).toString());
    const day = format(new Date().getDate().toString());

    const hour = format(new Date().getHours().toString());
    const minute = format(new Date().getMinutes().toString());
    const second = format(new Date().getSeconds().toString());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
