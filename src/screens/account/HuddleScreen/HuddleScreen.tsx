import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { useRenderInteractions } from '@hooks/useRenderInteractions';
import { useRenderComments } from '@hooks/useRenderComments';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import {
    deleteRequestUser,
    getRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesCommentsGetInterface,
    ResponseHuddlesGetInterface,
    ResponseHuddlesInteractionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleUpdatePutInterface } from '@interfaces/post/Post.inteface';
import { HuddleEditableCard } from '@components/huddles/HuddleEditableCard/HuddleEditableCard';
import {
    HuddleInteractionInterface,
    HuddleScreenProps
} from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleScreenStyle } from '@screens/account/HuddleScreen/HuddleScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { Back } from '@components/general/Back/Back';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { CommentInput } from '@components/huddles/CommentInput/CommentInput';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';

export const HuddleScreen = ({ route }: HuddleScreenProps): JSX.Element => {
    const { huddle, huddleId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();
    const openProfilePhoto = useOpenProfilePhoto();
    const { bottom } = useSafeAreaInsets();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [comments, setComments] = useState<Array<CommentItemInterface>>([]);
    const [mention, setMention] = useState<Mention>(null);
    const [mentions, setMentions] = useState<Array<Mention>>([]);
    const [editing, setEditing] = useState<boolean>(false);

    const editedTopic = useRef<string>(huddle?.topic);

    const created = useMemo((): boolean => {
        if (huddle) {
            return huddle?.createdBy === username;
        }

        return true;
    }, [huddle, username]);

    const commentsListRef = useRef(null);

    useEffect(() => {
        if (!huddle && huddleId) {
            getRequestUser<ResponseHuddlesGetInterface>(
                `huddle/${huddleId}/${username}`
            ).subscribe((response: ResponseHuddlesGetInterface) => {
                if (response?.status) {
                    navigation.setParams({
                        huddle: response?.data
                    } as undefined);
                }
            });
        }
    }, [huddle, huddleId, navigation, username]);

    const loadInteractions = useCallback(() => {
        if (created) {
            getRequestUser<ResponseHuddlesInteractionsGetInterface>(
                `interactions/${huddle?.id}`
            ).subscribe((response: ResponseHuddlesInteractionsGetInterface) => {
                if (response?.status) {
                    setInteractions(response?.data);
                }
            });
        }
    }, [created, huddle?.id]);

    const { onPressInteract } = useRenderHuddles();
    const { renderInteractionItem, keyInteractionExtractor } =
        useRenderInteractions();

    const loadComments = useCallback(
        (lastId?: number) => {
            let endpoint = `comments/${huddle?.id}/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseHuddlesCommentsGetInterface>(
                endpoint
            ).subscribe((response: ResponseHuddlesCommentsGetInterface) => {
                if (response?.status) {
                    setMentions(response?.mentions);

                    if (!lastId) {
                        setComments(response?.data);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setComments((value) => value.concat(response?.data));
                    }
                }
            });
        },
        [huddle?.id, username]
    );

    const load = useCallback(() => {
        if (huddle?.id) {
            loadInteractions();
            loadComments();
        }
    }, [huddle?.id, loadComments, loadInteractions]);

    useEffect(() => load(), [load]);

    const saveHuddle = useCallback(() => {
        huddle.topic = editedTopic?.current;
        setEditing(false);

        putRequestUser<ResponseInterface, HuddleUpdatePutInterface>('huddle', {
            id: huddle?.id,
            topic: editedTopic?.current
        }).subscribe();
    }, [huddle]);

    const deleteHuddle = useCallback(
        () =>
            deleteRequestUser<ResponseInterface>(
                `huddle/${huddle?.id}`
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    navigation.goBack();
                }
            }),
        [huddle?.id, navigation]
    );

    const deleteHuddleMessage = useCallback(
        () =>
            Alert.alert('Delete Huddle', '', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: deleteHuddle,
                    style: 'destructive'
                }
            ]),
        [deleteHuddle]
    );

    useEffect(
        () =>
            navigation.setOptions({
                headerLeft: () =>
                    editing ? (
                        <TouchableOpacity
                            onPress={deleteHuddleMessage}
                            style={HuddleScreenStyle.deleteButton}
                        >
                            <Text style={HuddleScreenStyle.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Back />
                    ),
                ...(created && {
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={
                                editing ? saveHuddle : () => setEditing(true)
                            }
                            style={HuddleScreenStyle.editButton}
                        >
                            <Text style={HuddleScreenStyle.buttonText}>
                                {editing ? 'Save' : 'Edit'}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }),
        [created, deleteHuddleMessage, editing, navigation, saveHuddle]
    );

    const getInteractionsListHeight = useCallback((): number => {
        if (!interactions?.length) {
            return 2;
        }

        const itemsHeight = interactions?.length * 45;
        const separatorsHeight = (interactions?.length - 1) * 15;

        return itemsHeight + separatorsHeight;
    }, [interactions?.length]);

    const {
        renderCommentItem,
        keyCommentExtractor,
        refreshControl,
        onEndReached
    } = useRenderComments(comments, huddle?.id, loadComments, load, setMention);

    const onSend = useCallback(() => {
        loadComments();
        commentsListRef.current?.scrollToIndex({
            index: comments?.length - 1,
            animated: true
        });
    }, [comments?.length, loadComments]);

    if (!huddle) {
        return null;
    }

    return (
        <View
            style={[
                HuddleScreenStyle.container,
                { paddingBottom: bottom - 15 }
            ]}
        >
            <FlashList
                ref={commentsListRef}
                ListHeaderComponent={
                    <>
                        <View style={HuddleScreenStyle.margin20}>
                            {editing ? (
                                <HuddleEditableCard
                                    topicValue={huddle?.topic}
                                    onTopicChange={(text) => {
                                        editedTopic.current = text;
                                    }}
                                    color={huddle.color}
                                    style={HuddleScreenStyle.huddleListItem}
                                />
                            ) : (
                                <LargeHuddleListItem
                                    item={huddle}
                                    created={created}
                                    onPressProfilePhoto={() =>
                                        openProfilePhoto(
                                            huddle.name,
                                            huddle?.profilePhoto
                                        )
                                    }
                                    onPressInteract={() =>
                                        onPressInteract(huddle)
                                    }
                                    hideCommentsNumber
                                    style={HuddleScreenStyle.huddleListItem}
                                />
                            )}
                        </View>
                        {created && (
                            <>
                                <Text style={HuddleScreenStyle.title}>
                                    Interactions 👋
                                </Text>
                                <View
                                    style={{
                                        height: getInteractionsListHeight()
                                    }}
                                >
                                    <FlashList
                                        data={interactions}
                                        renderItem={renderInteractionItem}
                                        keyExtractor={keyInteractionExtractor}
                                        estimatedItemSize={68}
                                        ItemSeparatorComponent={() => (
                                            <ItemSeparator space={15} />
                                        )}
                                    />
                                </View>
                            </>
                        )}
                        <Text style={HuddleScreenStyle.title}>Comments 💬</Text>
                    </>
                }
                data={comments}
                scrollEnabled={!editing}
                renderItem={renderCommentItem}
                keyExtractor={keyCommentExtractor}
                estimatedItemSize={68}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                ItemSeparatorComponent={() => <ItemSeparator space={30} />}
                contentContainerStyle={HuddleScreenStyle.listContentContainer}
            />
            <KeyboardAvoidingView keyboardVerticalOffset={42}>
                <CommentInput
                    huddleId={huddle?.id}
                    onSend={onSend}
                    mention={mention}
                    mentions={mentions}
                />
            </KeyboardAvoidingView>
        </View>
    );
};
