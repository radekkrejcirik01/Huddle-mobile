import moment, { Moment } from 'moment';

export const getLocalTimeFromUTC = (time: string): Moment => {
    const stillUtc = moment.utc(time);
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    return moment(local);
};
