import moment from 'moment';

export const getDate = (date: string, time: string): string => {
    const today = moment().toISOString();

    const day = new Date(today);
    if (date === 'Today') {
        day.setDate(day.getDate());
    }
    if (date === 'Tomorrow') {
        day.setDate(day.getDate() + 1);
    }

    const dateString = day.toISOString().substring(0, 10);

    return `${dateString} ${time}`;
};
