import { useCallback, useState } from 'react';

export const useRefresh = (
    refresh: () => void
): { refreshing: boolean; onRefresh: () => void } => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            refresh();
            setRefreshing(false);
        }, 1000);
    }, [refresh]);

    return { refreshing, onRefresh };
};
