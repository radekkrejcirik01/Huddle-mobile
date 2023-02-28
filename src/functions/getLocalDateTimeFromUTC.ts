import moment, { Moment } from 'moment';

export const getLocalDateTimeFromUTC = (time: Moment): string => {
    const stillUtc = moment.utc(time);
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    return local;
};
