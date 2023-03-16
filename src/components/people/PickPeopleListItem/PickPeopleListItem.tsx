import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { PickPeopleListItemProps } from '@components/people/PickPeopleListItem/PickPeopleListItem.props';
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';
import { PickPeopleListItemStyle } from '@components/people/PickPeopleListItem/PickPeopleListItem.style';

export const PickPeopleListItem = ({
    data,
    onPressPerson
}: PickPeopleListItemProps): JSX.Element => {
    const { selectedUsernames } = useSelector(
        (state: ReducerProps) => state.selectUsers
    );

    const [chosen, setChosen] = useState<boolean>(
        selectedUsernames.includes(data.item.username)
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                onPressPerson(data.item.username);
                setChosen(!chosen);
            }}
            style={[
                PickPeopleListItemStyle.itemView,
                chosen && { borderColor: COLORS.LIGHTGRAY_100 }
            ]}
        >
            <View>
                <Text style={PickPeopleListItemStyle.itemTextName}>
                    {data.item.firstname}
                </Text>
                <Text style={PickPeopleListItemStyle.itemTextUsername}>
                    {data.item.username}
                </Text>
            </View>
            <FastImage
                source={{ uri: data.item.profilePicture }}
                style={PickPeopleListItemStyle.itemImage}
            />
        </TouchableOpacity>
    );
};
