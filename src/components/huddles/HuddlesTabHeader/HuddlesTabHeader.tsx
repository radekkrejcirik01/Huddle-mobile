import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';
import { AddHuddle } from '@components/huddles/AddHuddle/AddHuddle';

export const HuddlesTabHeader = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[HuddlesTabHeaderStyle.header, { paddingTop: top + 50 }]}>
            <Text style={HuddlesTabHeaderStyle.title}>Huddles 👋</Text>
            <View style={HuddlesTabHeaderStyle.addHuddleView}>
                <AddHuddle />
            </View>
        </View>
    );
};
