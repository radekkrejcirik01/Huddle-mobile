import React from 'react';
import { View } from 'react-native';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddlesTabHeader } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader';

export const HuddlesScreen = (): JSX.Element => (
    <View style={HuddlesScreenStyle.flex}>
        <HuddlesTabHeader />
    </View>
);
