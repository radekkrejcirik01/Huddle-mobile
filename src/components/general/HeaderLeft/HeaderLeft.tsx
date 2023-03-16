import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/icon/Icon';
import { IconEnum } from '@components/icon/Icon.enum';
import { HeaderLeftStyle } from '@components/general/HeaderLeft/HeaderLeft.style';

export const HeaderLeft = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={HeaderLeftStyle.container}
        >
            <Icon name={IconEnum.BACK} size={20} />
            <Text style={HeaderLeftStyle.text}>Back</Text>
        </TouchableOpacity>
    );
};
