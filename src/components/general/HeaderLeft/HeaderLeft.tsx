import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/icon/Icon';
import { IconEnum } from '@components/icon/Icon.enum';

export const HeaderLeft = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={IconEnum.BACK} size={24} />
        </TouchableOpacity>
    );
};
