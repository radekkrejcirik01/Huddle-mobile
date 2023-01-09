import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import { HeaderPlus } from '@components/general/HeaderPlus/HeaderPlus';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel
};

export const PeopleTabOptions: BottomTabNavigationOptions = {
    header: () => (
        <SafeAreaView>
            <View style={BottomTabNavigatorStyle.peopleHeaderView}>
                <Text style={BottomTabNavigatorStyle.peopleHeaderContent}>
                    People
                </Text>
                <HeaderPlus />
            </View>
        </SafeAreaView>
    ),
    headerShown: true,
    tabBarLabel: 'People',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 26 : 24 }}>🔍</Text>
    )
};

export const HomeTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 25 : 20 }}>🏠‍️</Text>
    )
};
