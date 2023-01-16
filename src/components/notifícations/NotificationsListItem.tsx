import React, { useMemo, useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
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
    onAccept,
    onItemPress
}: NotificationsListItemProps): JSX.Element => {
    const [accepted, setAccepted] = useState<boolean>(!!item.accepted);
    const acceptButtonColor = useMemo(
        (): StyleProp<ViewStyle> => ({
            backgroundColor: accepted ? COLORS.GRAY_100 : COLORS.MAIN_BLUE
        }),
        [accepted]
    );
    const acceptText = useMemo(
        (): string => (!accepted ? 'Accept' : 'Accepted'),
        [accepted]
    );
    return (
        <TouchableOpacity
            disabled={item.type === NotificationTypeEnum.PEOPLE}
            onPress={() => onItemPress(item)}
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
                        {item.time}
                    </Text>
                </View>
            </View>
            {item.type === NotificationTypeEnum.PEOPLE && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setAccepted(!accepted);
                        onAccept(item);
                    }}
                    style={[
                        NotificationsListItemStyle.acceptButton,
                        acceptButtonColor
                    ]}
                >
                    <Text style={NotificationsListItemStyle.acceptText}>
                        {acceptText}
                    </Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};
