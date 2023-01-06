import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileScreenStyle } from '@screens/profile/ProfileScreen/ProfileScreen.style';

export const ProfileScreen = (): JSX.Element => (
    <SafeAreaView style={ProfileScreenStyle.safeArea}>
        <View style={ProfileScreenStyle.container}>
            <Text style={ProfileScreenStyle.title}>@radekkrejcirik</Text>
            <ScrollView>
                <FastImage
                    source={require('../../../assets/images/profilovka.png')}
                    style={ProfileScreenStyle.image}
                />
                <Text style={ProfileScreenStyle.name}>Radek</Text>
            </ScrollView>
        </View>
    </SafeAreaView>
);
