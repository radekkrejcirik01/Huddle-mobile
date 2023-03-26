import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import { NotificationsListItemProps } from '@components/notifícations/NotificationsistItem/NotificationsListItem.props';
import { NotificationsListItemStyle } from '@components/notifícations/NotificationsistItem/NotificationsListItem.style';
import {
    ACCEPTED_GROUP_HANGOUT_TYPE_TEXT,
    ACCEPTED_HANGOUT_TYPE_TEXT,
    ACCEPTED_PEOPLE_TYPE_TEXT,
    GROUP_HANGOUT_TYPE_TEXT,
    HANGOUT_TYPE_TEXT,
    PEOPLE_TYPE_TEXT
} from '@screens/account/NotificationsScreen/NotificationsScreen.const';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';

export const NotificationsListItem = ({
    item,
    onAcceptInvite,
    onOpenAccount,
    onOpenHangout
}: NotificationsListItemProps): JSX.Element => {
    const [accepted, setAccepted] = useState<boolean>();

    const acceptButtonColor = useMemo(
        (): StyleProp<TextStyle> => ({
            color: accepted ? COLORS.WHITE : COLORS.GRAY_100
        }),
        [accepted]
    );

    const acceptButtonBackgroundColor = useMemo(
        (): StyleProp<ViewStyle> => ({
            backgroundColor: accepted ? COLORS.GRAY_100 : COLORS.MAIN_WHITE
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
            onOpenAccount(item);
        }
        if (
            item.type === NotificationTypeEnum.HANGOUT ||
            item.type === NotificationTypeEnum.GROUP_HANGOUT ||
            item.type === NotificationTypeEnum.ACCEPTED_HANGOUT ||
            item.type === NotificationTypeEnum.ACCEPTED_GROUP_HANGOUT
        ) {
            onOpenHangout(item);
        }
    }, [item, onOpenAccount, onOpenHangout]);

    const onButtonPress = useCallback(() => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            setAccepted(!accepted);
            item.confirmed = accepted ? 0 : 1;
            onAcceptInvite(item);
        }
        if (
            item.type === NotificationTypeEnum.HANGOUT ||
            item.type === NotificationTypeEnum.GROUP_HANGOUT
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
        if (
            item.type === NotificationTypeEnum.HANGOUT ||
            item.type === NotificationTypeEnum.GROUP_HANGOUT
        ) {
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
        if (item.type === NotificationTypeEnum.GROUP_HANGOUT) {
            return GROUP_HANGOUT_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.ACCEPTED_PEOPLE) {
            return ACCEPTED_PEOPLE_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.ACCEPTED_HANGOUT) {
            return ACCEPTED_HANGOUT_TYPE_TEXT;
        }
        if (item.type === NotificationTypeEnum.ACCEPTED_GROUP_HANGOUT) {
            return ACCEPTED_GROUP_HANGOUT_TYPE_TEXT;
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
                        {moment(getLocalDateTimeFromUTC(item.time)).fromNow()}
                    </Text>
                </View>
            </View>
            {(item?.type === NotificationTypeEnum.HANGOUT ||
                item?.type === NotificationTypeEnum.GROUP_HANGOUT ||
                item?.type === NotificationTypeEnum.PEOPLE) && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onButtonPress}
                    style={[
                        NotificationsListItemStyle.acceptButton,
                        acceptButtonBackgroundColor
                    ]}
                >
                    <Text
                        style={[
                            NotificationsListItemStyle.acceptText,
                            acceptButtonColor
                        ]}
                    >
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};
