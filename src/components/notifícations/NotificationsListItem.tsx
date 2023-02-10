import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import { NotificationsListItemProps } from '@components/notifícations/NotificationsListItem.props';
import { NotificationsListItemStyle } from '@components/notifícations/NotificationsListItem.style';
import {
    ACCEPTED_HANGOUT_TYPE_TEXT,
    ACCEPTED_PEOPLE_TYPE_TEXT,
    HANGOUT_TYPE_TEXT,
    PEOPLE_TYPE_TEXT
} from '@screens/account/NotificationsScreen/NotificationsScreen.const';

export const NotificationsListItem = ({
    item,
    onAcceptInvite,
    onOpenAccount,
    onOpenHangout
}: NotificationsListItemProps): JSX.Element => {
    const [accepted, setAccepted] = useState<boolean>();

    const acceptButtonColor = useMemo(
        (): StyleProp<ViewStyle> => ({
            backgroundColor: accepted ? COLORS.GRAY_100 : COLORS.MAIN_BLUE
        }),
        [accepted]
    );

    useEffect(() => {
        setAccepted(item.confirmed === 1);
    }, [item.confirmed]);

    const onItemPress = useCallback(() => {
        if (
            item.type === NotificationTypeEnum.PEOPLE ||
            item.type === NotificationTypeEnum.ACCEPTED_PEOPLE
        ) {
            onOpenAccount(item, accepted);
        }
        if (
            item.type === NotificationTypeEnum.HANGOUT ||
            item.type === NotificationTypeEnum.ACCEPTED_HANGOUT
        ) {
            onOpenHangout(item);
        }
    }, [accepted, item, onOpenAccount, onOpenHangout]);

    const onButtonPress = useCallback(() => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            setAccepted(!accepted);
            item.confirmed = accepted ? 0 : 1;
            onAcceptInvite(item);
        }
        if (
            item.type === NotificationTypeEnum.HANGOUT ||
            item.type === NotificationTypeEnum.ACCEPTED_HANGOUT
        ) {
            onOpenHangout(item);
        }
    }, [accepted, item, onAcceptInvite, onOpenHangout]);

    const buttonText = useMemo((): string => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            if (accepted) {
                return 'Accepted';
            }
            return 'Accept';
        }
        if (item.type === NotificationTypeEnum.HANGOUT) {
            return 'Open';
        }
        return null;
    }, [accepted, item.type]);

    const getText = useMemo(() => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            return PEOPLE_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.HANGOUT) {
            return HANGOUT_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.ACCEPTED_PEOPLE) {
            return ACCEPTED_PEOPLE_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.ACCEPTED_HANGOUT) {
            return ACCEPTED_HANGOUT_TYPE_TEXT;
        }
        return null;
    }, [item.type]);

    return (
        <TouchableOpacity
            onPress={onItemPress}
            style={NotificationsListItemStyle.itemView}
        >
            <View style={NotificationsListItemStyle.contentView}>
                <FastImage
                    source={{ uri: item.profilePicture }}
                    style={NotificationsListItemStyle.itemImage}
                />
                <View style={NotificationsListItemStyle.itemTextContainer}>
                    <View style={NotificationsListItemStyle.flexRow}>
                        <Text
                            style={
                                NotificationsListItemStyle.itemTextDescription
                            }
                        >
                            <Text
                                style={
                                    NotificationsListItemStyle.itemTextUsername
                                }
                            >
                                {item.username}
                            </Text>
                            {getText}
                        </Text>
                    </View>
                    <Text
                        style={NotificationsListItemStyle.itemTextDescription}
                    >
                        {moment(item.time).fromNow()}
                    </Text>
                </View>
            </View>
            {(item?.type === NotificationTypeEnum.HANGOUT ||
                item?.type === NotificationTypeEnum.PEOPLE) && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onButtonPress}
                    style={[
                        NotificationsListItemStyle.acceptButton,
                        acceptButtonColor
                    ]}
                >
                    <Text style={NotificationsListItemStyle.acceptText}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};
