import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ChatsTabIconProps } from '@components/chats/ChatsTabIcon/ChatsTabIcon.props';
import { ReducerProps } from '@store/index/index.props';

export const ChatsTabIcon = ({ focused }: ChatsTabIconProps): JSX.Element => {
    const { unread } = useSelector(
        (state: ReducerProps) => state.unreadMessages
    );

    return (
        <View>
            <Text style={{ fontSize: focused ? 24 : 22 }}>💬</Text>
            <Badge value={unread} />
        </View>
    );
};
