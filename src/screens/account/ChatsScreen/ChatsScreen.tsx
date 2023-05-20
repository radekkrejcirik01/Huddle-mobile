import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
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

    const loadChats = useCallback(
        (lastId?: number) => {
            let endpoint = `chats/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseInterface>(endpoint).subscribe(
                (response: ResponseChatsGetInterface) => {
                    if (response?.status && !!response?.data?.length) {
                        if (lastId) {
                            setChats((value) => value.concat(response?.data));
                        } else {
                            setChats(response?.data);
                        }
                    }
                }
            );
        },
        [username]
    );

    useEffect(() => loadChats(), [loadChats]);

    const { renderChatItem, keyChatExtractor, refreshControl, onEndReached } =
        useRenderChats(chats, loadChats);

    return (
        <View style={ChatsScreenStyle.container}>
            <ChatsTabHeader />
            <FlashList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={keyChatExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                contentContainerStyle={ChatsScreenStyle.contentContainer}
            />
        </View>
    );
};
