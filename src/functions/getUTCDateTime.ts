import moment from 'moment';

export const getUTCDateTime = (dateTime: string): string => {
    if (dateTime !== undefined && !dateTime?.includes(undefined)) {
        const local = moment(dateTime);
        const utc = moment
            .utc(local.toISOString())
            .format('YYYY-MM-DD HH:mm:ss');
        return utc;
    }
    return dateTime;
};
