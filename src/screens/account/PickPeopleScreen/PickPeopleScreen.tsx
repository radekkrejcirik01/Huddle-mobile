import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponsePeopleGetInterface
} from '@interfaces/response/Response.interface';
import {
    SendHangoutInvitation,
    UserGetPostInterface
} from '@interfaces/post/Post.inteface';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { PickPeopleListItem } from '@components/people/PickPeopleListItem/PickPeopleListItem';
import { setUsersAction } from '@store/ChoosePeopleReducer';
import { HangoutPickerStyle } from '@screens/account/PickPeopleScreen/PickPeopleScreen.style';
import { PickPeopleScreenProps } from '@screens/account/PickPeopleScreen/PickPeopleScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const PickPeopleScreen = ({
    route
}: PickPeopleScreenProps): JSX.Element => {
    const { hangoutId = 0, usernames } = route.params;

    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { bottom } = useSafeAreaInsets();

    const [inputValue, setInputValue] = useState<string>();
    const [data, setData] = useState<Array<PeopleListItemProps>>([]);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [isInviteSent, setIsInviteSent] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<
        Array<PeopleListItemProps>
    >([]);
    const [refreshing, setRefreshing] = useState(false);

    const people = useRef(users);

    const loadPeople = useCallback(() => {
        postRequest<ResponsePeopleGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/people',
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

    useEffect(
        () =>
            navigation.addListener('beforeRemove', () => {
                if (!hangoutId) {
                    dispatch(setUsersAction(people.current));
                }
            }),
        [dispatch, hangoutId, navigation]
    );

    useEffect(() => {
        loadPeople();
    }, [loadPeople]);

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);
            const text = value.toLowerCase();
            const filteredName = data.filter((item: PeopleListItemProps) =>
                item.username.toLowerCase().match(text)
            );
            setFilteredData(filteredName);
        },
        [data]
    );

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
            setShowButton(!!people.current.length);
            setIsInviteSent(false);
        },
        [people]
    );

    const sendInvite = useCallback(() => {
        const newUsernames = people.current.filter(
            (value) => !usernames.includes(value)
        );
        if (newUsernames.length) {
            postRequest<ResponseInterface, SendHangoutInvitation>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/send/hangout/invitation',
                {
                    hangoutId,
                    user: username,
                    name: firstname,
                    usernames: newUsernames
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    navigation.setParams({
                        hangoutId,
                        usernames: [...usernames, ...newUsernames]
                    } as never);
                    setIsInviteSent(true);
                }
            });
        } else {
            Alert.alert('Please add new invited people');
        }
    }, [firstname, hangoutId, navigation, username, usernames]);

    const sendInviteText = useMemo(() => {
        if (isInviteSent) {
            return 'Sent ✅';
        }
        return 'Send invite';
    }, [isInviteSent]);

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
            {!!hangoutId && showButton && (
                <TouchableOpacity
                    onPress={sendInvite}
                    style={[
                        HangoutPickerStyle.sendButton,
                        {
                            bottom: bottom + 10
                        }
                    ]}
                >
                    <Text style={HangoutPickerStyle.sendText}>
                        {sendInviteText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
