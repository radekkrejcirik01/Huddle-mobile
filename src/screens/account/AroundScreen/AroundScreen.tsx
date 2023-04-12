import React from 'react';
import { View } from 'react-native';
import { AroundScreenStyle } from '@screens/account/AroundScreen/AroundScreen.style';
import { AroundTabHeader } from '@components/around/AroundTabHeader/AroundTabHeader';

export const AroundScreen = (): JSX.Element => (
    <View style={AroundScreenStyle.flex}>
        <AroundTabHeader />
    </View>
);
