import { format } from '@functions/format';

export const constructDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = format((date.getMonth() + 1).toString());
    const day = format(date.getDate().toString());

    const hour = format(date.getHours().toString());
    const minute = format(date.getMinutes().toString());

    return `${year}-${month}-${day} ${hour}:${minute}`;
};
