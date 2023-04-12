import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';

export const HuddlesTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={HuddlesTabHeaderStyle.header}>
            <Text style={HuddlesTabHeaderStyle.content}>Huddles 👋</Text>
        </View>
    </SafeAreaView>
);
