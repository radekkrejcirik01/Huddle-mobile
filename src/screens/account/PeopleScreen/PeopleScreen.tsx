import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
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
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponsePeopleGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const PeopleScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const [inputValue, setInputValue] = useState<string>();

    const [data, setData] = useState<Array<PeopleListItemProps>>([]);

    const onInputChange = (value: string) => {
        setInputValue(value);
    };

    useEffect(() => {
        postRequest<ResponsePeopleGetInterface, UserGetPostInterface>(
            'https://yco94z0aqg.execute-api.eu-central-1.amazonaws.com/PingMeUser/get/people',
            {
                username
            }
        ).subscribe((response: ResponsePeopleGetInterface) => {
            if (response?.status) {
                setData(response.data);
            }
        });
    }, [username]);

    const onItemPress = useCallback(
        (item: PeopleListItemProps) => {
            navigateTo(AccountStackNavigatorEnum.PersonAccountScreen, {
                firstname: item.firstname,
                username: item.username,
                profilePicture: item.profilePicture
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
        <SafeAreaView style={PeopleScreenStyle.safeArea}>
            <View style={PeopleScreenStyle.container}>
                <Input
                    iconLeft={<Text>🔍</Text>}
                    placeholder="Who you looking for?..."
                    onChange={onInputChange}
                    inputType={InputTypeEnum.TEXT}
                    viewStyle={PeopleScreenStyle.inputView}
                    inputStyle={PeopleScreenStyle.input}
                />
                <View style={PeopleScreenStyle.flashListView}>
                    <FlashList
                        data={data}
                        renderItem={renderItem}
                        estimatedItemSize={68}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
