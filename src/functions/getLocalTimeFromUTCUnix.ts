import moment, { Moment } from 'moment';

export const getLocalTimeFromUTCUnix = (time: string): Moment => {
    const stillUtc = moment.utc(moment.unix(Number(time)));
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    return moment(local);
};
