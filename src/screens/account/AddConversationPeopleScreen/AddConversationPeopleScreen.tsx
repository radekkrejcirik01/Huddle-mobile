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
    ResponseGetConversationUsersInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AddConversationUsersInterface,
    GetConversationUsersInterface,
    UserGetPostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useRefresh } from '@hooks/useRefresh';
import { AddConversationPeopleScreenStyle } from '@screens/account/AddConversationPeopleScreen/AddConversationPeopleScreen.style';
import { AddConversationPeopleScreenProps } from '@screens/account/AddConversationPeopleScreen/AddConversationPeopleScreen.props';

export const AddConversationPeopleScreen = ({
    route
}: AddConversationPeopleScreenProps): JSX.Element => {
    const { conversationId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

    const [people, setPeople] = useState<ResponseFriendsGetInterface['data']>(
        []
    );
    const [conversationUsernames, setConversationUsernames] =
        useState<Array<string>>();

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

    const loadConversationUsers = useCallback(() => {
        postRequest<
            ResponseGetConversationUsersInterface,
            GetConversationUsersInterface
        >(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/get/conversation/usernames',
            {
                conversationId
            }
        ).subscribe((response: ResponseGetConversationUsersInterface) => {
            if (response?.status) {
                setConversationUsernames(response?.data);
            }
        });
    }, [conversationId]);

    const load = useCallback(() => {
        loadPeople();
        loadConversationUsers();
    }, [loadConversationUsers, loadPeople]);

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
            (value: string) => !conversationUsernames.includes(value)
        );
        if (newUsernames.length) {
            postRequest<ResponseInterface, AddConversationUsersInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/add/conversation/users',
                {
                    conversationId,
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
    }, [conversationId, conversationUsernames, load]);

    const sendInviteText = useMemo(() => {
        if (isInviteSent) {
            return 'Sent ✅';
        }
        return 'Send invite';
    }, [isInviteSent]);

    return (
        <View style={AddConversationPeopleScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                viewStyle={AddConversationPeopleScreenStyle.inputView}
                inputStyle={AddConversationPeopleScreenStyle.input}
            />
            <View style={AddConversationPeopleScreenStyle.flashListView}>
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
                        AddConversationPeopleScreenStyle.sendButton,
                        {
                            bottom: bottom + 10
                        }
                    ]}
                >
                    <Text style={AddConversationPeopleScreenStyle.sendText}>
                        {sendInviteText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
