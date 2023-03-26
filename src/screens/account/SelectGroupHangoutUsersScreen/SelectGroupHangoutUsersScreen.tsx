import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { FriendsListItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { SelectFriendListItem } from '@components/general/SelectFriendListItem/SelectFriendListItem';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    setSelectedUsernamesAction,
    setSelectedUsersAction
} from '@store/SelectUsersReducer';
import { SelectGroupHangoutUsersScreenStyle } from '@screens/account/SelectGroupHangoutUsersScreen/SelectGroupHangoutUsersScreen.style';
import { useRefresh } from '@hooks/useRefresh';

export const SelectGroupHangoutUsersScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const { selectedUsernames } = useSelector(
        (state: ReducerProps) => state.selectUsers
    );

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { bottom } = useSafeAreaInsets();

    const [inputValue, setInputValue] = useState<string>();
    const [filteredData, setFilteredData] = useState<
        Array<FriendsListItemProps>
    >([]);

    const [people, setPeople] = useState<Array<FriendsListItemProps>>([]);

    const selected = useRef<Array<string>>(selectedUsernames);

    const [showButton, setShowButton] = useState<boolean>(false);

    const loadPeople = useCallback(() => {
        postRequest<ResponseFriendsGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/people',
            {
                username
            }
        ).subscribe((response: ResponseFriendsGetInterface) => {
            if (response?.status) {
                setPeople(response?.data);
                setFilteredData(response?.data);
            }
        });
    }, [username]);

    useEffect(() => loadPeople(), [loadPeople]);

    const { onRefresh, refreshing } = useRefresh(loadPeople);

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);
            const text = value.toLowerCase();
            const filteredName = people.filter((item: FriendsListItemProps) =>
                item.username.toLowerCase().match(text)
            );
            setFilteredData(filteredName);
        },
        [people]
    );

    const onPressPerson = useCallback(
        (user: string) => {
            if (selected.current.includes(user)) {
                selected.current = selected.current.filter(
                    (value: string) => value !== user
                );
            } else {
                selected.current = [...selected.current, user];
            }

            const difference = selected.current
                .filter((value: string) => !selectedUsernames.includes(value))
                .concat(
                    selectedUsernames.filter(
                        (value: string) => !selected.current.includes(value)
                    )
                );
            setShowButton(!!difference.length);
        },
        [selectedUsernames]
    );

    const saveUsers = useCallback(() => {
        dispatch(setSelectedUsernamesAction(selected.current.sort()));

        const usersArray = [];
        for (let i = 0; i < selected.current?.length; i += 1) {
            const user = people.find(
                (value: FriendsListItemProps) =>
                    value.username === selected.current[i]
            );
            usersArray.push(user);
        }
        dispatch(setSelectedUsersAction(usersArray));

        navigation.goBack();
    }, [dispatch, navigation, people]);

    return (
        <View style={SelectGroupHangoutUsersScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                viewStyle={SelectGroupHangoutUsersScreenStyle.inputView}
                inputStyle={SelectGroupHangoutUsersScreenStyle.input}
            />
            <View style={SelectGroupHangoutUsersScreenStyle.flashListView}>
                <FlashList
                    data={filteredData}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="white"
                        />
                    }
                    renderItem={(
                        item: ListRenderItemInfo<FriendsListItemProps>
                    ) => (
                        <SelectFriendListItem
                            data={item}
                            onSelect={onPressPerson}
                        />
                    )}
                    estimatedItemSize={68}
                />
            </View>
            {showButton && (
                <TouchableOpacity
                    onPress={saveUsers}
                    style={[
                        SelectGroupHangoutUsersScreenStyle.sendButton,
                        {
                            bottom: bottom + 10
                        }
                    ]}
                >
                    <Text style={SelectGroupHangoutUsersScreenStyle.sendText}>
                        Done
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
