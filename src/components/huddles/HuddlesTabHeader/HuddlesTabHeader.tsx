import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';

export const HuddlesTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={HuddlesTabHeaderStyle.header}>
            <Text style={HuddlesTabHeaderStyle.content}>Huddles</Text>
        </View>
    </SafeAreaView>
);
