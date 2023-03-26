import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FriendsPlus } from '@components/general/FriendsPlus/FriendsPlus';
import { FriendsTabHeaderStyle } from '@components/friends/FriendsTabHeader/FriendsTabHeader.style';

export const FriendsTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={FriendsTabHeaderStyle.header}>
            <Text style={FriendsTabHeaderStyle.content}>Friends</Text>
            <FriendsPlus />
        </View>
    </SafeAreaView>
);
