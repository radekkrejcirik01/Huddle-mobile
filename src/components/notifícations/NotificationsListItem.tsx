import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';
import {
    HANGOUT_TYPE_TEXT,
    PEOPLE_TYPE_TEXT
} from '@screens/account/NotificationsScreen/NotificationsScreen.const';
import { NotificationsListItemProps } from '@components/notifícations/NotificationsListItem.props';
import { NotificationsListItemStyle } from '@components/notifícations/NotificationsListItem.style';

export const NotificationsListItem = ({
    item,
    onAcceptInvite,
    onOpenHangout
}: NotificationsListItemProps): JSX.Element => {
    const [accepted, setAccepted] = useState<boolean>(!!item.confirmed);

    const acceptButtonColor = useMemo((): StyleProp<ViewStyle> => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            return {
                backgroundColor: accepted ? COLORS.GRAY_100 : COLORS.MAIN_BLUE
            };
        }
        return { backgroundColor: COLORS.GRAY_100 };
    }, [accepted, item.type]);

    const onButtonPress = useCallback(() => {
        if (item.type === NotificationTypeEnum.PEOPLE) {
            setAccepted(!accepted);
            item.confirmed = accepted ? 0 : 1;
            onAcceptInvite(item);
        } else {
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
        return 'Open';
    }, [accepted, item.type]);

    return (
        <TouchableOpacity
            disabled={item.type === NotificationTypeEnum.PEOPLE}
            onPress={onButtonPress}
            style={NotificationsListItemStyle.itemView}
        >
            <View style={NotificationsListItemStyle.contentView}>
                <FastImage
                    source={{ uri: item.profilePicture }}
                    style={NotificationsListItemStyle.itemImage}
                />
                <View>
                    <View style={NotificationsListItemStyle.flexRow}>
                        <Text
                            style={NotificationsListItemStyle.itemTextUsername}
                        >
                            {item.username}
                        </Text>
                        <Text
                            style={
                                NotificationsListItemStyle.itemTextDescription
                            }
                        >
                            {item.type === NotificationTypeEnum.PEOPLE
                                ? PEOPLE_TYPE_TEXT
                                : HANGOUT_TYPE_TEXT}
                        </Text>
                    </View>
                    <Text
                        style={NotificationsListItemStyle.itemTextDescription}
                    >
                        {moment(item.time).fromNow()}
                    </Text>
                </View>
            </View>
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
        </TouchableOpacity>
    );
};
