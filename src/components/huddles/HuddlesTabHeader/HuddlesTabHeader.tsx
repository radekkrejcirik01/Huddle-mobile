import React from 'react';
import { Text, View } from 'react-native';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';
import { AddHuddle } from '@components/huddles/AddHuddle/AddHuddle';

export const HuddlesTabHeader = (): JSX.Element => (
    <View style={HuddlesTabHeaderStyle.header}>
        <Text style={[HuddlesTabHeaderStyle.title, { flex: 1 }]}>Huddles</Text>
        <Text style={HuddlesTabHeaderStyle.title}>👋</Text>
        <View style={HuddlesTabHeaderStyle.addHuddleView}>
            <AddHuddle />
        </View>
    </View>
);
