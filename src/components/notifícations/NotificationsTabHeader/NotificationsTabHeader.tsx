import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { NotificationsTabHeaderStyle } from '@components/notifícations/NotificationsTabHeader/NotificationsTabHeader.style';

export const NotificationsTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={NotificationsTabHeaderStyle.header}>
            <Text style={NotificationsTabHeaderStyle.content}>
                Notifications
            </Text>
        </View>
    </SafeAreaView>
);
