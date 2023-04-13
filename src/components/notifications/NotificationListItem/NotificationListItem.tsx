import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getLocalTimeFromUTC } from '@functions/getLocalTimeFromUTC';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import { NotificationListItemProps } from '@components/notifications/NotificationListItem/NotificationListItem.props';

export const NotificationListItem = ({
    listItem,
    onOpenAccount,
    onAcceptFriendInvite,
    onOpenChat,
    onOpenHuddle
}: NotificationListItemProps): JSX.Element => {
    const getMessage = (item: NotificationsListProps): string => {
        if (item.type === NotificationTypeEnum.FRIEND_INVITE) {
            return `${item.senderName} sends a friend invite 🥳`;
        }
        if (item.type === NotificationTypeEnum.FRIEND_ACCEPTED) {
            return `${item.senderName} accepted a friend invite 🥳`;
        }
        if (item.type === NotificationTypeEnum.HANGOUT_NOTIFY) {
            return `${item.senderName} sends a hangout!`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_INTERACTED) {
            return `${item.senderName} interacted with your huddle`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_CONFIRMED) {
            return `${item.senderName} confirmed huddle!`;
        }
        return '';
    };

    const getAction = useCallback(
        (item: NotificationsListProps): void => {
            if (item.type === NotificationTypeEnum.FRIEND_INVITE) {
                if (item.confirmed) {
                    return onOpenAccount(item);
                }
                return onAcceptFriendInvite(item);
            }
            if (
                item.type === NotificationTypeEnum.FRIEND_ACCEPTED ||
                item.type === NotificationTypeEnum.HANGOUT_NOTIFY
            ) {
                return onOpenChat(item);
            }
            if (
                item.type === NotificationTypeEnum.HUDDLE_INTERACTED ||
                item.type === NotificationTypeEnum.HUDDLE_CONFIRMED
            ) {
                return onOpenHuddle(item);
            }
            return null;
        },
        [onAcceptFriendInvite, onOpenAccount, onOpenChat, onOpenHuddle]
    );

    const getButtonText = (item: NotificationsListProps): string => {
        if (item.type === NotificationTypeEnum.FRIEND_INVITE) {
            if (item.confirmed) {
                return 'Accepted';
            }
            return `Accept`;
        }
        if (
            item.type === NotificationTypeEnum.FRIEND_ACCEPTED ||
            item.type === NotificationTypeEnum.HANGOUT_NOTIFY
        ) {
            return 'Open chat';
        }
        if (
            item.type === NotificationTypeEnum.HUDDLE_INTERACTED ||
            item.type === NotificationTypeEnum.HUDDLE_CONFIRMED
        ) {
            return 'Open huddle';
        }
        return '';
    };

    return (
        <View style={NotificationsScreenStyle.itemContainer}>
            <TouchableOpacity onPress={() => onOpenAccount(listItem)}>
                <FastImage
                    source={{ uri: listItem.profilePicture }}
                    style={NotificationsScreenStyle.itemImage}
                />
            </TouchableOpacity>
            <View style={NotificationsScreenStyle.itemInnerContainer}>
                <TouchableOpacity
                    onPress={() => onOpenAccount(listItem)}
                    style={NotificationsScreenStyle.flex}
                >
                    <Text style={NotificationsScreenStyle.itemMessage}>
                        {getMessage(listItem)}
                    </Text>
                    <Text style={NotificationsScreenStyle.itemTime}>
                        {getLocalTimeFromUTC(listItem.created).fromNow()}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getAction(listItem)}>
                    <Text style={NotificationsScreenStyle.itemButtonText}>
                        {getButtonText(listItem)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
