import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRenderFriends } from '@hooks/useRenderFriends';
import { FriendsScreenStyle } from '@screens/account/FriendsScreen/FriendsScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';

export const FriendsScreen = (): JSX.Element => {
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
                item.name.toLowerCase().match(text)
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
        <View style={FriendsScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                inputStyle={FriendsScreenStyle.input}
            />
            <FlashList
                data={filteredData}
                renderItem={renderFriendsItem}
                refreshControl={refreshControl}
                keyExtractor={keyFriendsExtractor}
                estimatedItemSize={68}
                onEndReached={onEndReached}
            />
        </View>
    );
};
