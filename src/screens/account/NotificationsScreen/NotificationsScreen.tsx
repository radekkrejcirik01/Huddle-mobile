import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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

    const [data, setData] = useState<Array<NotificationsListProps>>([]);

    const loadNotifications = useCallback(() => {
        getRequestUser<ResponseNotificationsGetInterface>(
            `notifications/${username}`
        ).subscribe((response: ResponseNotificationsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    useEffect(() => {
        dispatch(setNotificationsNumberAction(0));

        return () => {};
    }, [dispatch]);

    const { renderNotificationItem, refreshControl, keyNotificationExtractor } =
        useRenderNotifications(loadNotifications);

    return (
        <View style={NotificationsScreenStyle.container}>
            <FlashList
                data={data}
                extraData={data}
                renderItem={renderNotificationItem}
                refreshControl={refreshControl}
                keyExtractor={keyNotificationExtractor}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator space={25} />}
                contentContainerStyle={
                    NotificationsScreenStyle.listContentContainer
                }
            />
        </View>
    );
};
