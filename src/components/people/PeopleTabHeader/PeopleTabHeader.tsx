import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { FriendsPlus } from '@components/general/FriendsPlus/FriendsPlus';
import { PeopleTabHeaderStyle } from '@components/people/PeopleTabHeader/PeopleTabHeader.style';

export const PeopleTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={PeopleTabHeaderStyle.header}>
            <Text style={PeopleTabHeaderStyle.content}>Friends</Text>
            <FriendsPlus />
        </View>
    </SafeAreaView>
);
