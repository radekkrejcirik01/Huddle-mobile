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
import { useOpenChat } from '@hooks/useOpenChat';
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
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';
import {
    HuddleRemoveConfirmPutInterface,
    HuddleRepostPutInterface,
    HuddleUpdatePutInterface
} from '@interfaces/post/Post.inteface';
import { HuddleEditableCard } from '@components/huddles/HuddleEditableCard/HuddleEditableCard';
import {
    HuddleInteractionInterface,
    HuddleScreenProps
} from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleScreenStyle } from '@screens/account/HuddleScreen/HuddleScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { Back } from '@components/general/Back/Back';
import { SwipeableView } from '@components/general/SwipeableView/SwipeableView';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { CommentInput } from '@components/huddles/CommentInput/CommentInput';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';

export const HuddleScreen = ({ route }: HuddleScreenProps): JSX.Element => {
    const { huddle, huddleId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();
    const openChat = useOpenChat();
    const openProfilePhoto = useOpenProfilePhoto();
    const { bottom } = useSafeAreaInsets();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [confirmedUser, setConfirmedUser] =
        useState<HuddleInteractionInterface>();
    const [comments, setComments] = useState<Array<CommentItemInterface>>([]);
    const [mention, setMention] = useState<Mention>(null);
    const [mentions, setMentions] = useState<Array<Mention>>([]);
    const [canceled, setCanceled] = useState<boolean>(!!huddle?.canceled);
    const [editing, setEditing] = useState<boolean>(false);

    const editedWhat = useRef<string>(huddle?.what);
    const editedWhere = useRef<string>(huddle?.where);
    const editedWhen = useRef<string>(huddle?.when);

    const created = useMemo((): boolean => {
        if (huddle) {
            return huddle?.createdBy === username;
        }

        return true;
    }, [huddle, username]);

    const commentsListRef = useRef(null);

    useEffect(() => {
        if (!huddle) {
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
                    setConfirmedUser(response?.confirmedUser);
                    setInteractions(response?.data);
                }
            });
        }
    }, [created, huddle?.id]);

    const { onPressInteract } = useRenderHuddles();
    const { renderInteractionItem, keyInteractionExtractor } =
        useRenderInteractions(huddle, !!confirmedUser, loadInteractions);

    const loadComments = useCallback(() => {
        getRequestUser<ResponseHuddlesCommentsGetInterface>(
            `comments/${huddle?.id}/${username}`
        ).subscribe((response: ResponseHuddlesCommentsGetInterface) => {
            if (response?.status) {
                setComments(response?.data);
                setMentions(response?.mentions);
            }
        });
    }, [huddle?.id, username]);

    const load = useCallback(() => {
        if (huddle?.id) {
            loadInteractions();
            loadComments();
        }
    }, [huddle?.id, loadComments, loadInteractions]);

    useEffect(() => load(), [load]);

    const saveHuddle = useCallback(() => {
        huddle.what = editedWhat?.current;
        huddle.where = editedWhere?.current;
        huddle.when = editedWhen?.current;
        setEditing(false);

        putRequestUser<ResponseInterface, HuddleUpdatePutInterface>('huddle', {
            id: huddle?.id,
            what: editedWhat?.current,
            where: editedWhere?.current,
            when: editedWhen?.current
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

    const removeConfirm = useCallback(
        () =>
            putRequestUser<ResponseInterface, HuddleRemoveConfirmPutInterface>(
                'huddle/confirm',
                {
                    id: huddle?.id
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadInteractions();
                }
            }),
        [huddle?.id, loadInteractions]
    );

    const getInteractionsListHeight = useCallback((): number => {
        const itemsHeight = interactions?.length * 45;
        const separatorsHeight = (interactions?.length - 1) * 15;

        return itemsHeight + separatorsHeight;
    }, [interactions?.length]);

    const { renderCommentItem, keyCommentExtractor, refreshControl } =
        useRenderComments(huddle?.id, loadComments, load, setMention);

    const onSend = useCallback(() => {
        loadComments();
        commentsListRef.current?.scrollToIndex({
            index: comments?.length - 1,
            animated: true
        });
    }, [comments?.length, loadComments]);

    const repostHuddle = useCallback(
        () =>
            putRequestUser<ResponseInterface, HuddleRepostPutInterface>(
                'huddle/post',
                {
                    id: huddle?.id
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    setCanceled(false);
                }
            }),
        [huddle?.id]
    );

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
                                    whatValue={huddle?.what}
                                    onWhatChange={(text) => {
                                        editedWhat.current = text;
                                    }}
                                    whereValue={huddle?.where}
                                    onWhereChange={(text) => {
                                        editedWhere.current = text;
                                    }}
                                    whenValue={huddle?.when}
                                    onWhenChange={(text) => {
                                        editedWhen.current = text;
                                    }}
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
                                {!!confirmedUser && (
                                    <>
                                        <Text style={HuddleScreenStyle.title}>
                                            Confirmed ✅
                                        </Text>
                                        <SwipeableView
                                            text="Remove"
                                            onAction={removeConfirm}
                                            style={
                                                HuddleScreenStyle.swipeableView
                                            }
                                        >
                                            <HuddleInteractionsListItem
                                                item={confirmedUser}
                                                onPressPhoto={() =>
                                                    openProfilePhoto(
                                                        confirmedUser.name,
                                                        confirmedUser?.profilePhoto
                                                    )
                                                }
                                                isConfirmed={!!confirmedUser}
                                                onOpenChat={() =>
                                                    openChat(
                                                        confirmedUser.name,
                                                        confirmedUser?.profilePhoto,
                                                        confirmedUser?.username
                                                    )
                                                }
                                            />
                                        </SwipeableView>
                                    </>
                                )}
                                {!!interactions?.length && (
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
                                                renderItem={
                                                    renderInteractionItem
                                                }
                                                keyExtractor={
                                                    keyInteractionExtractor
                                                }
                                                estimatedItemSize={68}
                                                ItemSeparatorComponent={() => (
                                                    <ItemSeparator space={15} />
                                                )}
                                            />
                                        </View>
                                    </>
                                )}
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
                ItemSeparatorComponent={() => <ItemSeparator space={30} />}
                ListEmptyComponent={
                    <Text style={HuddleScreenStyle.emptyListText}>
                        No comments yet
                    </Text>
                }
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
            {canceled && (
                <TouchableOpacity
                    onPress={repostHuddle}
                    style={HuddleScreenStyle.repostView}
                >
                    <Text style={HuddleScreenStyle.repostText}>Post again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
