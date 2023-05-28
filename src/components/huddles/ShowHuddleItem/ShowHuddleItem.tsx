import React, { useState } from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ShowHuddleItemProps } from '@components/huddles/ShowHuddleItem/ShowHuddleItem.props';
import { ShowHuddleItemStyle } from '@components/huddles/ShowHuddleItem/ShowHuddleItem.style';

export const ShowHuddleItem = ({
    item,
    onItemPress
}: ShowHuddleItemProps): JSX.Element => {
    const [show, setShow] = useState<boolean>(!item.hidden);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                setShow(!show);
                onItemPress();
            }}
            style={ShowHuddleItemStyle.view}
        >
            <FastImage
                source={{ uri: item.user?.profilePhoto }}
                style={[
                    ShowHuddleItemStyle.image,
                    {
                        opacity: show ? 1 : 0.5
                    }
                ]}
            />
            <Text
                style={[
                    ShowHuddleItemStyle.nameText,
                    {
                        opacity: show ? 1 : 0.5
                    }
                ]}
            >
                {item.user.name}
            </Text>
        </TouchableOpacity>
    );
};
