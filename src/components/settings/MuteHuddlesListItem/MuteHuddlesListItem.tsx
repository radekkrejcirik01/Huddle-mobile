import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MuteHuddlesItemProps } from '@components/settings/MuteHuddlesListItem/MuteHuddlesListItem.props';
import { MuteHuddlesListItemStyle } from '@components/settings/MuteHuddlesListItem/MuteHuddlesListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const MuteHuddlesListItem = ({
    item,
    onPresUnmute
}: MuteHuddlesItemProps): JSX.Element => (
    <View style={MuteHuddlesListItemStyle.container}>
        <View style={MuteHuddlesListItemStyle.infoView}>
            <ProfilePhoto
                name={item.name}
                photo={item?.profilePhoto}
                size={40}
            />
            <Text style={MuteHuddlesListItemStyle.nameText}>{item.name}</Text>
        </View>
        <TouchableOpacity
            onPress={onPresUnmute}
            style={MuteHuddlesListItemStyle.unmuteView}
        >
            <Text style={MuteHuddlesListItemStyle.unmuteText}>Unmute</Text>
        </TouchableOpacity>
    </View>
);
