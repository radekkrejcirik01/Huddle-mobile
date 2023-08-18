import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRenderFriends } from '@hooks/useRenderFriends';
import { ContactsScreenStyle } from '@screens/account/ContactsScreen/ContactsScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FriendsItemProps } from '@screens/account/ContactsScreen/ContactsScreen.props';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseFriendsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const ContactsScreen = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>();
    const [data, setData] = useState<Array<FriendsItemProps>>([]);
    const [filteredData, setFilteredData] = useState<Array<FriendsItemProps>>(
        []
    );

    const loadFriends = (lastId?: number) => {
        let endpoint = 'people';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequestUser<ResponseFriendsGetInterface>(endpoint).subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    putRequestUser<ResponseInterface, undefined>(
                        'seen-invites'
                    ).subscribe();

                    if (!lastId) {
                        setData(response?.data);
                        setFilteredData(response?.data);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setData((value) => value.concat(response?.data));
                    }
                }
            }
        );
    };

    useFocusEffect(
        useCallback(() => {
            loadFriends();
        }, [])
    );

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);

            const text = value.toLowerCase();
            const filteredName = data.filter((item: FriendsItemProps) =>
                item.user.name.toLowerCase().match(text)
            );

            setFilteredData(filteredName);
        },
        [data]
    );

    const {
        renderFriendsItem,
        keyFriendsExtractor,
        refreshControl,
        onEndReached
    } = useRenderFriends(data, loadFriends);

    return (
        <View style={ContactsScreenStyle.container}>
            {!!data?.length && (
                <Input
                    iconLeft={<Text>🔍</Text>}
                    placeholder="Name"
                    value={inputValue}
                    onChange={filterData}
                    inputType={InputTypeEnum.TEXT}
                    inputStyle={ContactsScreenStyle.input}
                    viewStyle={ContactsScreenStyle.inputView}
                />
            )}
            <FlashList
                data={filteredData}
                renderItem={renderFriendsItem}
                refreshControl={refreshControl}
                keyExtractor={keyFriendsExtractor}
                estimatedItemSize={68}
                ListEmptyComponent={
                    <Text style={ContactsScreenStyle.description}>
                        no added friends yet 😴
                    </Text>
                }
                onEndReached={onEndReached}
                ItemSeparatorComponent={() => <ItemSeparator space={8} />}
                contentContainerStyle={ContactsScreenStyle.listContentContainer}
            />
        </View>
    );
};
