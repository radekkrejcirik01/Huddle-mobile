import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MuteHuddlesItemProps } from '@components/settings/MuteHuddlesListItem/MuteHuddlesListItem.props';
import { MuteHuddlesListItemStyle } from '@components/settings/MuteHuddlesListItem/MuteHuddlesListItem.style';

export const MuteHuddlesListItem = ({
    item,
    onPresUnmute
}: MuteHuddlesItemProps): JSX.Element => (
    <View style={MuteHuddlesListItemStyle.container}>
        <View style={MuteHuddlesListItemStyle.infoView}>
            <FastImage
                source={{ uri: item?.profilePhoto }}
                style={MuteHuddlesListItemStyle.image}
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
