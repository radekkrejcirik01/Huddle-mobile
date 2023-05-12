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
        if (item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPT) {
            return `${item.senderName} accepted a friend invite`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_INTERACT) {
            return `${item.senderName} tapped to a huddle:\n${item.what}`;
        }
        if (item.type === NotificationTypeEnum.HUDDLE_CONFIRM) {
            return `${item.senderName} confirmed a huddle:\n${item.what}`;
        }
        if (item.type === NotificationTypeEnum.COMMENT) {
            return `${item.senderName} add a comment:\n${item.comment}`;
        }
        if (item.type === NotificationTypeEnum.COMMENT_MENTION) {
            return `${item.senderName} mentioned you:\n${item.comment}`;
        }
        if (item.type === NotificationTypeEnum.COMMENT_LIKE) {
            return `${item.senderName} liked your comment:\n${item.comment}`;
        }
        return '';
    };

    const getItemAction = useCallback(
        (item: NotificationsListProps): void => {
            if (item.type === NotificationTypeEnum.PERSON_INVITE) {
                return onOpenAccount();
            }

            if (item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPT) {
                return onOpenChat();
            }

            if (
                item.type === NotificationTypeEnum.HUDDLE_INTERACT ||
                item.type === NotificationTypeEnum.HUDDLE_CONFIRM ||
                item.type === NotificationTypeEnum.COMMENT ||
                item.type === NotificationTypeEnum.COMMENT_MENTION ||
                item.type === NotificationTypeEnum.COMMENT_LIKE
            ) {
                return onOpenHuddle();
            }
            return null;
        },
        [onOpenAccount, onOpenChat, onOpenHuddle]
    );

    const getButtonAction = useCallback(
        (item: NotificationsListProps): void => {
            if (item.type === NotificationTypeEnum.PERSON_INVITE) {
                if (item.accepted) {
                    return onOpenChat();
                }
                return onAcceptPersonInvite();
            }
            if (
                item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPT ||
                // When a friend confirmed Huddle
                item.type === NotificationTypeEnum.HUDDLE_CONFIRM ||
                // When a user confirmed Huddle
                !!item?.confirmed
            ) {
                return onOpenChat();
            }
            if (item.type === NotificationTypeEnum.HUDDLE_INTERACT) {
                return onConfirmHuddle();
            }
            if (
                item.type === NotificationTypeEnum.COMMENT ||
                item.type === NotificationTypeEnum.COMMENT_MENTION ||
                item.type === NotificationTypeEnum.COMMENT_LIKE
            ) {
                return onOpenHuddle();
            }
            return null;
        },
        [onAcceptPersonInvite, onConfirmHuddle, onOpenChat, onOpenHuddle]
    );

    const getButtonText = (item: NotificationsListProps): string => {
        if (item.type === NotificationTypeEnum.PERSON_INVITE) {
            if (item?.accepted) {
                return 'Accepted';
            }
            return `Accept`;
        }
        if (
            item.type === NotificationTypeEnum.PERSON_INVITE_ACCEPT ||
            // When a friend confirmed Huddle
            item.type === NotificationTypeEnum.HUDDLE_CONFIRM ||
            // When a user confirmed Huddle
            !!item?.confirmed
        ) {
            return 'Message';
        }
        if (item.type === NotificationTypeEnum.HUDDLE_INTERACT) {
            return 'Confirm';
        }
        if (
            item.type === NotificationTypeEnum.COMMENT ||
            item.type === NotificationTypeEnum.COMMENT_MENTION ||
            item.type === NotificationTypeEnum.COMMENT_LIKE
        ) {
            return 'Open';
        }
        return '';
    };

    return (
        <View style={NotificationListItemStyle.container}>
            <TouchableOpacity
                onPress={() => getItemAction(listItem)}
                style={NotificationListItemStyle.content}
            >
                <TouchableOpacity onPress={onOpenAccount}>
                    <FastImage
                        source={{ uri: listItem.profilePhoto }}
                        style={NotificationListItemStyle.image}
                    />
                </TouchableOpacity>
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
