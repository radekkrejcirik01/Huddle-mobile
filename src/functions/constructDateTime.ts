export const constructDateTime = (date: string, time: string): Date => {
    const dateTime = new Date();

    if (date && time) {
        const hour = Number(time.substring(0, 2));
        const minute = Number(time.substring(3, 5));

        if (date === 'Tomorrow') {
            dateTime.setDate(dateTime.getDate() + 1);
        }

        dateTime.setHours(hour, minute);
    }

    return dateTime;
};
