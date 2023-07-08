import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRenderChats } from '@hooks/useRenderChats';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseChatsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { UnreadMessagesService } from '@utils/general/UnreadMessagesService';

export const ChatsScreen = (): JSX.Element => {
    const isFocused = useIsFocused();

    const [chats, setChats] = useState<Array<ChatsListDataProps>>([]);

    const interval = useRef(null);

    const loadChats = useCallback((lastId?: number) => {
        let endpoint = 'chats';
        if (lastId) {
            clearInterval(interval.current);
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
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadChats();
        }, [loadChats])
    );

    useFocusEffect(
        useCallback(() => {
            putRequestUser<ResponseInterface, undefined>(
                'last-seen-read-message'
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    UnreadMessagesService.loadUnread();
                }
            });
        }, [])
    );

    const startLoadingInterval = useCallback(() => {
        clearInterval(interval.current);

        interval.current = setInterval(() => {
            loadChats();
        }, 2000);
    }, [loadChats]);

    useFocusEffect(
        useCallback(() => {
            startLoadingInterval();
        }, [startLoadingInterval])
    );

    useEffect(() => {
        if (!isFocused) {
            clearInterval(interval.current);
        }
    }, [isFocused]);

    const { renderChatItem, keyChatExtractor, refreshControl, onEndReached } =
        useRenderChats(chats, loadChats);

    return (
        <View style={ChatsScreenStyle.container}>
            <FlashList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={keyChatExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                ItemSeparatorComponent={() => <ItemSeparator space={20} />}
                contentContainerStyle={ChatsScreenStyle.contentContainer}
            />
        </View>
    );
};
