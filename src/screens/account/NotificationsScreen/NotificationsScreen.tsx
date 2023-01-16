import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import { NotificationsListItem } from '@components/notifícations/NotificationsListItem';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [refreshing, setRefreshing] = useState(false);

    const loadNotifications = useCallback(() => {
        Alert.alert('load');
    }, []);

    const data: Array<NotificationsListProps> = [
        {
            id: 1,
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
            username: 'tomlucapo',
            type: NotificationTypeEnum.PEOPLE,
            time: 'Today',
            accepted: 0
        },
        {
            id: 2,
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
            username: 'tom',
            type: NotificationTypeEnum.PEOPLE,
            time: 'Today',
            accepted: 1
        },
        {
            id: 3,
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
            username: 'tomlucapo',
            type: NotificationTypeEnum.HANGOUT,
            time: 'Yesterday'
        }
    ];

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            loadNotifications();
        }, 1000);
    }, [loadNotifications]);

    const onItemPress = useCallback((item: NotificationsListProps) => {
        Alert.alert(`hangout id: ${item.id}`);
    }, []);

    const onAcceptFriendInvite = useCallback((item: NotificationsListProps) => {
        Alert.alert(item.username);
    }, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationsListProps>): JSX.Element => (
            <NotificationsListItem
                item={item}
                onAccept={onAcceptFriendInvite}
                onItemPress={onItemPress}
            />
        ),
        [onAcceptFriendInvite, onItemPress]
    );

    return (
        <View style={NotificationsScreenStyle.container}>
            <View style={NotificationsScreenStyle.flashListView}>
                <FlashList
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refresh}
                            tintColor="white"
                        />
                    }
                    renderItem={renderItem}
                    estimatedItemSize={68}
                />
            </View>
        </View>
    );
};
