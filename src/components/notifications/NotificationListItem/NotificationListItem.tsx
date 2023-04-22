import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getLocalTimeFromUTC } from '@functions/getLocalTimeFromUTC';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import { NotificationListItemProps } from '@components/notifications/NotificationListItem/NotificationListItem.props';
import { NotificationListItemStyle } from '@components/notifications/NotificationListItem/NotificationListItem.style';

export const NotificationListItem = ({
    listItem,
    onOpenAccount,
    onAcceptPersonInvite,
    onOpenChat,
    onOpenHuddle,
    onConfirmHuddle
}: NotificationListItemProps): JSX.Element => {
    const getMessage = (item: NotificationsListProps): string => {
        if (item.type === NotificationTypeEnum.PERSON_INVITE) {
            return `${item.senderName} sends a friend invite`;
        }
        if (item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPTED) {
            return `${item.senderName} accepted a friend invite`;
        }
        if (item.type === NotificationTypeEnum.HANGOUT_NOTIFY) {
            return `${item.senderName} sends a hangout!`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_INTERACTED) {
            return `${item.senderName} tapped to a huddle:\n${item.what}`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_CONFIRMED) {
            return `${item.senderName} confirmed a huddle:\n${item.what}`;
        }
        return '';
    };

    const getItemAction = useCallback(
        (item: NotificationsListProps): void => {
            if (
                item.type === NotificationTypeEnum.PERSON_INVITE ||
                item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPTED ||
                item.type === NotificationTypeEnum.HANGOUT_NOTIFY
            ) {
                return onOpenAccount(item);
            }

            if (
                item.type === NotificationTypeEnum.HUDDLE_INTERACTED ||
                item.type === NotificationTypeEnum.HUDDLE_CONFIRMED
            ) {
                return onOpenHuddle(item);
            }
            return null;
        },
        [onOpenAccount, onOpenHuddle]
    );

    const getButtonAction = useCallback(
        (item: NotificationsListProps): void => {
            if (item.type === NotificationTypeEnum.PERSON_INVITE) {
                if (item.accepted) {
                    return onOpenAccount(item);
                }
                return onAcceptPersonInvite(item);
            }
            if (
                item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPTED ||
                item.type === NotificationTypeEnum.HANGOUT_NOTIFY ||
                // When a friend confirmed Huddle
                item.type === NotificationTypeEnum.HUDDLE_CONFIRMED ||
                // When a user confirmed Huddle
                !!item?.confirmed
            ) {
                return onOpenChat(item);
            }
            if (item.type === NotificationTypeEnum.HUDDLE_INTERACTED) {
                return onConfirmHuddle(item);
            }
            return null;
        },
        [onAcceptPersonInvite, onConfirmHuddle, onOpenAccount, onOpenChat]
    );

    const getButtonText = (item: NotificationsListProps): string => {
        if (item.type === NotificationTypeEnum.PERSON_INVITE) {
            if (item?.accepted) {
                return 'Accepted';
            }
            return `Accept`;
        }
        if (
            item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPTED ||
            item.type === NotificationTypeEnum.HANGOUT_NOTIFY ||
            // When a friend confirmed Huddle
            item.type === NotificationTypeEnum.HUDDLE_CONFIRMED ||
            // When a user confirmed Huddle
            !!item?.confirmed
        ) {
            return 'Message';
        }
        if (item.type === NotificationTypeEnum.HUDDLE_INTERACTED) {
            return 'Confirm';
        }
        return '';
    };

    return (
        <View style={NotificationListItemStyle.container}>
            <TouchableOpacity
                onPress={() => getItemAction(listItem)}
                style={NotificationListItemStyle.content}
            >
                <FastImage
                    source={{ uri: listItem.profilePhoto }}
                    style={NotificationListItemStyle.image}
                />
                <View style={NotificationListItemStyle.innerContainer}>
                    <Text style={NotificationListItemStyle.message}>
                        {getMessage(listItem)}
                    </Text>
                    <Text style={NotificationListItemStyle.time}>
                        {getLocalTimeFromUTC(listItem.created).fromNow()}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={NotificationListItemStyle.buttonContainer}>
                <TouchableOpacity
                    onPress={() => getButtonAction(listItem)}
                    style={NotificationListItemStyle.buttonView}
                >
                    <Text style={NotificationListItemStyle.buttonText}>
                        {getButtonText(listItem)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
