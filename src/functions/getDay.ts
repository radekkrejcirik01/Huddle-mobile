import moment from 'moment';

const getDateEnding = (day: string): string => {
    const value = day.slice(-1);
    if (value === '1') {
        return `${day}st`;
    }
    if (value === '2') {
        return `${day}nd`;
    }
    if (value === '3') {
        return `${day}rd`;
    }
    return `${day}th`;
};

export const getDay = (date: string): string => {
    const today = moment().toISOString();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowString = tomorrow.toISOString().substring(0, 10);
    const yesterdayString = yesterday.toISOString().substring(0, 10);

    if (today.includes(date)) {
        return 'Today';
    }
    if (tomorrowString.includes(date)) {
        return 'Tomorrow';
    }
    if (yesterdayString.includes(date)) {
        return 'Yesterday';
    }

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const month = monthNames[moment(date).month()];
    const day = moment(date).date().toString();

    return `${month} ${getDateEnding(day)}`;
};
