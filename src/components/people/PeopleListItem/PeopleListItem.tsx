import React from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { PeopleListItemProps } from '@components/people/PeopleListItem/PeopleListItem.props';
import { PeopleListItemStyle } from '@components/people/PeopleListItem/PeopleListItem.style';

export const PeopleListItem = ({
    item,
    onItemPress,
    onPhotoPress
}: PeopleListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onItemPress} style={PeopleListItemStyle.view}>
        <TouchableOpacity onPress={onPhotoPress}>
            <FastImage
                source={{ uri: item.profilePhoto }}
                style={PeopleListItemStyle.image}
            />
        </TouchableOpacity>
        <Text style={PeopleListItemStyle.name}>{item.name}</Text>
    </TouchableOpacity>
);
