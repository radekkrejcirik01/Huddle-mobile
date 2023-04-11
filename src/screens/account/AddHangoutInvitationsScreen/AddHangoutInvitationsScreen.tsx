import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, RefreshControl, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { SelectFriendListItem } from '@components/general/SelectFriendListItem/SelectFriendListItem';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseFriendsGetInterface,
    ResponseGetHangoutUsernamesInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    GetHangoutUsernamesInterface,
    SendHangoutInvitation,
    UserGetPostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useRefresh } from '@hooks/useRefresh';
import { AddHangoutInvitationsScreenProps } from '@screens/account/AddHangoutInvitationsScreen/AddHangoutInvitationsScreen.props';
import { AddHangoutInvitationsScreenStyle } from '@screens/account/AddHangoutInvitationsScreen/AddHangoutInvitationsScreen.style';

export const AddHangoutInvitationsScreen = ({
    route
}: AddHangoutInvitationsScreenProps): JSX.Element => {
    const { hangoutId } = route.params;

    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { bottom } = useSafeAreaInsets();

    const [people, setPeople] = useState<ResponseFriendsGetInterface['data']>(
        []
    );
    const [hangoutUsernames, setHangoutUsernames] = useState<Array<string>>();

    const [inputValue, setInputValue] = useState<string>();
    const [filteredData, setFilteredData] = useState<
        Array<PeopleListItemProps>
    >([]);

    const pickedUsernames = useRef<Array<string>>([]);

    const [showButton, setShowButton] = useState<boolean>(false);
    const [isInviteSent, setIsInviteSent] = useState<boolean>(false);

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

    const getHangoutUsernames = useCallback(() => {
        postRequest<
            ResponseGetHangoutUsernamesInterface,
            GetHangoutUsernamesInterface
        >(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/hangout/usernames',
            {
                hangoutId
            }
        ).subscribe((response: ResponseGetHangoutUsernamesInterface) => {
            if (response?.status) {
                setHangoutUsernames(response?.data);
            }
        });
    }, [hangoutId]);

    const load = useCallback(() => {
        loadPeople();
        getHangoutUsernames();
    }, [getHangoutUsernames, loadPeople]);

    useEffect(() => load(), [load]);

    const { onRefresh, refreshing } = useRefresh(load);

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);
            const text = value.toLowerCase();
            const filteredName = people.filter((item) =>
                item.username.toLowerCase().match(text)
            );
            setFilteredData(filteredName);
        },
        [people]
    );

    const onPressPerson = (user: string) => {
        const array = pickedUsernames.current;
        if (array.includes(user)) {
            pickedUsernames.current = array.filter(
                (value: string) => value !== user
            );
        } else {
            pickedUsernames.current = [...array, user];
        }
        setShowButton(!!pickedUsernames.current.length);
        setIsInviteSent(false);
    };

    const sendInvite = useCallback(() => {
        const newUsernames = pickedUsernames.current.filter(
            (value: string) => !hangoutUsernames.includes(value)
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
                    setIsInviteSent(true);
                    load();
                }
            });
        } else {
            Alert.alert('Please add new invited people');
        }
    }, [firstname, hangoutId, hangoutUsernames, load, username]);

    const sendInviteText = useMemo(() => {
        if (isInviteSent) {
            return 'Sent ✅';
        }
        return 'Send invite';
    }, [isInviteSent]);

    return (
        <View style={AddHangoutInvitationsScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                viewStyle={AddHangoutInvitationsScreenStyle.inputView}
                inputStyle={AddHangoutInvitationsScreenStyle.input}
            />
            <View style={AddHangoutInvitationsScreenStyle.flashListView}>
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
                        item: ListRenderItemInfo<PeopleListItemProps>
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
                    onPress={sendInvite}
                    style={[
                        AddHangoutInvitationsScreenStyle.sendButton,
                        {
                            bottom: bottom + 10
                        }
                    ]}
                >
                    <Text style={AddHangoutInvitationsScreenStyle.sendText}>
                        {sendInviteText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
