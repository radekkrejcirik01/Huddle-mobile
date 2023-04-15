import React, { useCallback, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { PeopleScreenStyle } from '@screens/account/PeopleScreen/PeopleScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponsePeopleGetInterface } from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';

export const PeopleScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [inputValue, setInputValue] = useState<string>();

    const [data, setData] = useState<Array<PeopleListItemProps>>([]);
    const [filteredData, setFilteredData] = useState<
        Array<PeopleListItemProps>
    >([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadPeople = useCallback(() => {
        getRequestUser<ResponsePeopleGetInterface>(
            `people/${username}`
        ).subscribe((response: ResponsePeopleGetInterface) => {
            if (response?.status) {
                setData(response?.data);
                setFilteredData(response?.data);
            }
        });
    }, [username]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadPeople
    );

    const filterData = (value: string) => {
        setInputValue(value);
        const text = value.toLowerCase();
        const filteredName = data.filter((item: PeopleListItemProps) =>
            item.username.toLowerCase().match(text)
        );
        setFilteredData(filteredName);
    };

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            loadPeople();
        }, 1000);
    }, [loadPeople]);

    const onItemPress = useCallback(
        (item: PeopleListItemProps) => {
            navigateTo(AccountStackNavigatorEnum.PersonProfileScreen, {
                username: item.username,
                name: item.firstname,
                profilePhoto: item.profilePicture
            });
        },
        [navigateTo]
    );

    const renderItem = ({
        item
    }: ListRenderItemInfo<PeopleListItemProps>): JSX.Element => (
        <TouchableOpacity
            onPress={() => onItemPress(item)}
            style={PeopleScreenStyle.itemView}
        >
            <View>
                <Text style={PeopleScreenStyle.itemTextName}>
                    {item.firstname}
                </Text>
                <Text style={PeopleScreenStyle.itemTextUsername}>
                    {item.username}
                </Text>
            </View>
            <FastImage
                source={{ uri: item.profilePicture }}
                style={PeopleScreenStyle.itemImage}
            />
        </TouchableOpacity>
    );

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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                        tintColor="white"
                    />
                }
                renderItem={renderItem}
                estimatedItemSize={68}
                contentContainerStyle={PeopleScreenStyle.listContentContainer}
            />
        </View>
    );
};
