import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { useRenderChats } from '@hooks/useRenderChats';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseChatsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';
import { ChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ChatsTabHeader } from '@components/chats/ChatsTabHeader/ChatsTabHeader';

export const ChatsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [chats, setChats] = useState<Array<ChatsListDataProps>>([]);

    const loadChats = useCallback(() => {
        getRequestUser<ResponseInterface>(`chats/${username}`).subscribe(
            (response: ResponseChatsGetInterface) => {
                if (response?.status) {
                    setChats(response?.data);
                }
            }
        );
    }, [username]);

    const { renderChatItem, keyChatExtractor, refreshControl } =
        useRenderChats(loadChats);

    return (
        <View style={ChatsScreenStyle.container}>
            <ChatsTabHeader />
            <FlashList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={keyChatExtractor}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={68}
                contentContainerStyle={ChatsScreenStyle.contentContainer}
            />
        </View>
    );
};
