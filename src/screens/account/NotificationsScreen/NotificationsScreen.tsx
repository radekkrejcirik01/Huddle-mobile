import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseNotificationsGetInterface } from '@interfaces/response/Response.interface';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { setNotificationsNumberAction } from '@store/UserReducer';
import { useRenderNotifications } from '@hooks/useRenderNotifications';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const { bottom } = useSafeAreaInsets();

    const [data, setData] = useState<Array<NotificationsListProps>>([]);

    const loadNotifications = useCallback(
        (lastId?: number) => {
            let endpoint = `notifications/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseNotificationsGetInterface>(
                endpoint
            ).subscribe((response: ResponseNotificationsGetInterface) => {
                if (response?.status && !!response?.data?.length) {
                    if (lastId) {
                        setData((value) => value.concat(response?.data));
                    } else {
                        setData(response?.data);
                    }
                }
            });
        },
        [username]
    );

    useEffect(() => {
        dispatch(setNotificationsNumberAction(0));

        return () => {};
    }, [dispatch]);

    const {
        renderNotificationItem,
        refreshControl,
        keyNotificationExtractor,
        onEndReached
    } = useRenderNotifications(data, loadNotifications);

    return (
        <View
            style={[
                NotificationsScreenStyle.container,
                { paddingBottom: bottom }
            ]}
        >
            <FlashList
                data={data}
                renderItem={renderNotificationItem}
                refreshControl={refreshControl}
                keyExtractor={keyNotificationExtractor}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                ItemSeparatorComponent={() => <ItemSeparator space={25} />}
                contentContainerStyle={
                    NotificationsScreenStyle.listContentContainer
                }
            />
        </View>
    );
};
