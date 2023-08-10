import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
    useFocusEffect,
    useIsFocused,
    useNavigation as useDefaultNavigation
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useMessaging } from '@hooks/useMessaging';
import { useRenderChats } from '@hooks/useRenderChats';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseChatsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { ReducerProps } from '@store/index/index.props';
import { PostHuddleButton } from '@components/huddles/PostHuddleButton/PostHuddleButton';

export const ChatsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    useMessaging();
    const isFocused = useIsFocused();
    const navigation = useDefaultNavigation();

    const [chats, setChats] = useState<Array<ChatsListDataProps>>([]);

    const interval = useRef(null);

    useEffect(
        () =>
            navigation.setOptions({
                headerLeft: () => <PostHuddleButton onCreateHuddle={() => {}} />
            }),
        [navigation]
    );

    const loadChats = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = 'chats';
                if (lastId) {
                    clearInterval(interval.current);
                    endpoint += `/${lastId}`;
                }

                getRequestUser<ResponseInterface>(endpoint).subscribe(
                    (response: ResponseChatsGetInterface) => {
                        if (response?.status && !!response?.data?.length) {
                            if (lastId) {
                                setChats((value) =>
                                    value.concat(response?.data)
                                );
                            } else {
                                setChats(response?.data);
                            }
                        } else {
                            setChats([]);
                        }
                    }
                );
            }
        },
        [username]
    );

    useFocusEffect(loadChats);

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
                ItemSeparatorComponent={() => <ItemSeparator space={18} />}
                ListEmptyComponent={
                    <Text style={ChatsScreenStyle.description}>
                        no chats yet 😴
                    </Text>
                }
                contentContainerStyle={ChatsScreenStyle.contentContainer}
            />
        </View>
    );
};
