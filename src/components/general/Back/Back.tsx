import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { BackStyle } from '@components/general/Back/Back.style';

export const Back = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={BackStyle.container}
        >
            <Icon name={IconEnum.BACK} size={20} />
            <Text style={BackStyle.text}>Back</Text>
        </TouchableOpacity>
    );
};
