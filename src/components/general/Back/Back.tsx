import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { BackStyle } from '@components/general/Back/Back.style';

export const Back = (): JSX.Element => {
    const navigation = useNavigation();

    return (
        <IconButton
            icon={IconEnum.BACK_BLUE}
            onPress={() => navigation.goBack()}
            size={20}
            style={BackStyle.container}
        />
    );
};
