import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { PeoplePlus } from '@components/people/PeoplePlus/PeoplePlus';
import { PeopleTabHeaderStyle } from '@components/people/PeopleTabHeader/PeopleTabHeader.style';

export const PeopleTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={PeopleTabHeaderStyle.header}>
            <Text style={PeopleTabHeaderStyle.content}>People</Text>
            <PeoplePlus />
        </View>
    </SafeAreaView>
);
