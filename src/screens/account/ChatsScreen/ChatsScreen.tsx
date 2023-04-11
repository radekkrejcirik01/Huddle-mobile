import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { useMessagesListRenders } from '@hooks/useMessagesListRenders';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseChatsGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ChatsTabHeader } from '@components/chats/ChatsTabHeader/ChatsTabHeader';

export const ChatsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [data, setData] = useState<Array<ChatsListDataProps>>([]);

    const loadConversations = useCallback(() => {
        postRequest<ResponseChatsGetInterface, UserGetPostInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/get/conversations/0',
            {
                username
            }
        ).subscribe((response: ResponseChatsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadConversations
    );

    const onItemPress = useCallback(
        (item: ChatsListDataProps) => {
            navigateTo(AccountStackNavigatorEnum.ConversationScreen, {
                conversationId: item?.id
            });
        },
        [navigateTo]
    );

    const onRefresh = useCallback(() => {
        loadConversations();
    }, [loadConversations]);

    const { renderItem, keyExtractor, refreshControl } = useMessagesListRenders(
        data,
        onItemPress,
        onRefresh
    );

    return (
        <View style={ChatsScreenStyle.container}>
            <ChatsTabHeader />
            <FlashList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={68}
                contentContainerStyle={ChatsScreenStyle.contentContainer}
            />
        </View>
    );
};
