import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigationScreenHeader } from '@navigation/StackNavigators/StackNavigator.options';
import { MessagesStackNavigatorEnum } from '@navigation/StackNavigators/messages/MessagesStackNavigator.enum';
import { MessagesScreen } from '@screens/profile/messages/MessagesScreen/MessagesScreen';
import { ChatScreen } from '@screens/profile/messages/ChatScreen/ChatScreen';
import {
    ChatTitle,
    MessagesTitle
} from '@navigation/StackNavigators/messages/MessagesStackNavigator.options';

const Messages = createStackNavigator<ParamListBase>();

export const MessagesStackNavigator = (): JSX.Element => (
    <Messages.Navigator>
        <Messages.Screen
            name={MessagesStackNavigatorEnum.MessagesScreen}
            component={MessagesScreen}
            options={{ ...NavigationScreenHeader, ...MessagesTitle }}
        />
        <Messages.Screen
            name={MessagesStackNavigatorEnum.ChatScreen}
            component={ChatScreen}
            options={{ ...NavigationScreenHeader, ...ChatTitle }}
        />
    </Messages.Navigator>
);
