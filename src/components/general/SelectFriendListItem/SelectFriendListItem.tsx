import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SelectFriendListItemProps } from '@components/general/SelectFriendListItem/SelectFriendListItem.props';
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';
import { SelectFriendListItemStyle } from '@components/general/SelectFriendListItem/SelectFriendListItem.style';

export const SelectFriendListItem = ({
    data,
    onSelect
}: SelectFriendListItemProps): JSX.Element => {
    const { selectedUsernames } = useSelector(
        (state: ReducerProps) => state.selectUsers
    );

    const [chosen, setChosen] = useState<boolean>(
        selectedUsernames.includes(data?.item?.username)
    );

    const onPress = useCallback(() => {
        onSelect(data?.item?.username);
        setChosen(!chosen);
    }, [chosen, data?.item?.username, onSelect]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                SelectFriendListItemStyle.itemView,
                chosen && { borderColor: COLORS.LIGHTGRAY_100 }
            ]}
        >
            <View>
                <Text style={SelectFriendListItemStyle.itemTextName}>
                    {data?.item?.firstname}
                </Text>
                <Text style={SelectFriendListItemStyle.itemTextUsername}>
                    {data?.item?.username}
                </Text>
            </View>
            <FastImage
                source={{ uri: data?.item?.profilePicture }}
                style={SelectFriendListItemStyle.itemImage}
            />
        </TouchableOpacity>
    );
};
