import React, { useCallback, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { FriendsScreenStyle } from '@screens/account/FriendsScreen/FriendsScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FriendsListItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const FriendsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [inputValue, setInputValue] = useState<string>();

    const [data, setData] = useState<Array<FriendsListItemProps>>([]);
    const [filteredData, setFilteredData] = useState<
        Array<FriendsListItemProps>
    >([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadPeople = useCallback(() => {
        postRequest<ResponseFriendsGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/people',
            {
                username
            }
        ).subscribe((response: ResponseFriendsGetInterface) => {
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
        const filteredName = data.filter((item: FriendsListItemProps) =>
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
        (item: FriendsListItemProps) => {
            navigateTo(AccountStackNavigatorEnum.FriendProfileScreen, {
                checkInvitation: false,
                firstname: item.firstname,
                username: item.username,
                profilePicture: item.profilePicture
            });
        },
        [navigateTo]
    );

    const renderItem = ({
        item
    }: ListRenderItemInfo<FriendsListItemProps>): JSX.Element => (
        <TouchableOpacity
            onPress={() => onItemPress(item)}
            style={FriendsScreenStyle.itemView}
        >
            <View>
                <Text style={FriendsScreenStyle.itemTextName}>
                    {item.firstname}
                </Text>
                <Text style={FriendsScreenStyle.itemTextUsername}>
                    {item.username}
                </Text>
            </View>
            <FastImage
                source={{ uri: item.profilePicture }}
                style={FriendsScreenStyle.itemImage}
            />
        </TouchableOpacity>
    );

    return (
        <View style={FriendsScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                viewStyle={FriendsScreenStyle.inputView}
                inputStyle={FriendsScreenStyle.input}
            />
            <View style={FriendsScreenStyle.flashListView}>
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
                />
            </View>
        </View>
    );
};
