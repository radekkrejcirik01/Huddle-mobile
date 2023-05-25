import moment, { Moment } from 'moment';

export const getLocalTimeFromUTCUnix = (time: number): Moment => {
    const stillUtc = moment.utc(moment.unix(Number(time)));
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    return moment(local);
};
