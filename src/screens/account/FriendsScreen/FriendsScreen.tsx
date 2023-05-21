import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRenderFriends } from '@hooks/useRenderFriends';
import { FriendsScreenStyle } from '@screens/account/FriendsScreen/FriendsScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';
import { FriendsTabHeader } from '@components/friends/FriendsTabHeader/FriendsTabHeader';

export const FriendsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const route = useRoute();

    const [inputValue, setInputValue] = useState<string>();

    const [data, setData] = useState<Array<FriendsItemProps>>([]);
    const [filteredData, setFilteredData] = useState<Array<FriendsItemProps>>(
        []
    );

    const loadFriends = useCallback(
        (lastId?: number) => {
            let endpoint = `people/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseFriendsGetInterface>(endpoint).subscribe(
                (response: ResponseFriendsGetInterface) => {
                    if (response?.status && !!response?.data?.length) {
                        if (lastId) {
                            setData((value) => value.concat(response?.data));
                        } else {
                            setData(response?.data);
                            setFilteredData(response?.data);
                        }
                    }
                }
            );
        },
        [username]
    );

    useEffect(() => loadFriends(), [loadFriends]);

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
            {route.name === 'FriendsTab' && <FriendsTabHeader />}
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
                contentContainerStyle={FriendsScreenStyle.listContentContainer}
            />
        </View>
    );
};
