import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponsePeopleGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { PickPeopleListItem } from '@components/people/PickPeopleListItem/PickPeopleListItem';
import { setUsersAction } from '@store/ChoosePeopleReducer';
import { HangoutPickerStyle } from '@screens/account/PickPeopleScreen/PickPeopleScreen.style';

export const PickPeopleScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState<string>();
    const [data, setData] = useState<Array<PeopleListItemProps>>([]);

    const [filteredData, setFilteredData] = useState<
        Array<PeopleListItemProps>
    >([]);
    const [refreshing, setRefreshing] = useState(false);

    const people = useRef(users);

    const loadPeople = useCallback(() => {
        postRequest<ResponsePeopleGetInterface, UserGetPostInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/get/people',
            {
                username
            }
        ).subscribe((response: ResponsePeopleGetInterface) => {
            if (response?.status) {
                setData(response?.data);
                setFilteredData(response?.data);
            }
        });
    }, [username]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(setUsersAction(people.current));
        });
        return unsubscribe;
    }, [dispatch, navigation]);

    useEffect(() => {
        loadPeople();
    }, [loadPeople]);

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
            loadPeople();
            setRefreshing(false);
        }, 1000);
    }, [loadPeople]);

    const onPressPerson = useCallback(
        (user: string) => {
            const array = people.current;
            if (array.includes(user)) {
                people.current = array.filter(
                    (value: string) => value !== user
                );
            } else {
                people.current = [...array, user];
            }
        },
        [people]
    );

    return (
        <View style={HangoutPickerStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                viewStyle={HangoutPickerStyle.inputView}
                inputStyle={HangoutPickerStyle.input}
            />
            <View style={HangoutPickerStyle.flashListView}>
                <FlashList
                    data={filteredData}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refresh}
                            tintColor="white"
                        />
                    }
                    renderItem={(
                        item: ListRenderItemInfo<PeopleListItemProps>
                    ) => (
                        <PickPeopleListItem
                            data={item}
                            onPressPerson={onPressPerson}
                        />
                    )}
                    estimatedItemSize={68}
                />
            </View>
        </View>
    );
};
