import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { AroundTabHeaderStyle } from '@components/around/AroundTabHeader/AroundTabHeader.style';

export const AroundTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={AroundTabHeaderStyle.header}>
            <Text style={AroundTabHeaderStyle.content}>Around 🚀</Text>
        </View>
    </SafeAreaView>
);
