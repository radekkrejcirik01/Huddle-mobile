import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useRenderPeople } from '@hooks/useRenderPeople';
import { PeopleScreenStyle } from '@screens/account/PeopleScreen/PeopleScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { PeopleItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponsePeopleGetInterface } from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';

export const PeopleScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [inputValue, setInputValue] = useState<string>();

    const [data, setData] = useState<Array<PeopleItemProps>>([]);
    const [filteredData, setFilteredData] = useState<Array<PeopleItemProps>>(
        []
    );

    const loadPeople = useCallback(
        (lastId?: number) => {
            let endpoint = `people/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponsePeopleGetInterface>(endpoint).subscribe(
                (response: ResponsePeopleGetInterface) => {
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

    useEffect(() => loadPeople(), [loadPeople]);

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);

            const text = value.toLowerCase();
            const filteredName = data.filter((item: PeopleItemProps) =>
                item.name.toLowerCase().match(text)
            );

            setFilteredData(filteredName);
        },
        [data]
    );

    const {
        renderPeopleItem,
        keyPeopleExtractor,
        refreshControl,
        onEndReached
    } = useRenderPeople(data, loadPeople);

    return (
        <View style={PeopleScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                inputStyle={PeopleScreenStyle.input}
            />
            <FlashList
                data={filteredData}
                renderItem={renderPeopleItem}
                refreshControl={refreshControl}
                keyExtractor={keyPeopleExtractor}
                estimatedItemSize={68}
                onEndReached={onEndReached}
                contentContainerStyle={PeopleScreenStyle.listContentContainer}
            />
        </View>
    );
};
