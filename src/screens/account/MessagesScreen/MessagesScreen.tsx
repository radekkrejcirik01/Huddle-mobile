import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import { useMessagesListRenders } from '@hooks/useMessagesListRenders';
import { MessagesListDataProps } from '@screens/account/MessagesScreen/MessagesScreen.props';
import { MessagesScreenStyle } from './MessagesScreen.style';

export const MessagesScreen = (): JSX.Element => {
    const data: Array<MessagesListDataProps> = [
        {
            message: 'A',
            email: '@radek',
            firstname: 'Radek',
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
            isRead: 0,
            time: moment()
        }
    ];

    const onItemPress = () => {};

    const onRefresh = () => {};

    const { getItemType, renderItem, keyExtractor, refreshControl } =
        useMessagesListRenders(data, onItemPress, onRefresh);

    return (
        <View style={MessagesScreenStyle.container}>
            <FlashList
                data={data}
                getItemType={getItemType}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={68}
                contentContainerStyle={MessagesScreenStyle.contentContainer}
            />
        </View>
    );
};
