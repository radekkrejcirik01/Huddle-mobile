import React, { useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ShowHuddleItemProps } from '@components/huddles/ShowHuddleItem/ShowHuddleItem.props';
import { ShowHuddleItemStyle } from '@components/huddles/ShowHuddleItem/ShowHuddleItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

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
            style={[
                ShowHuddleItemStyle.view,
                {
                    opacity: show ? 1 : 0.5
                }
            ]}
        >
            <ProfilePhoto
                name={item.user.name}
                photo={item?.user?.profilePhoto}
                size={35}
            />
            <Text style={ShowHuddleItemStyle.nameText}>{item.user.name}</Text>
        </TouchableOpacity>
    );
};
