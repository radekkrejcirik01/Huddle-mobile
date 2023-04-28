import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, StyleProp, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import {
    HuddleInteractionInterface,
    HuddleModalScreenDefaultProps,
    HuddleModalScreenProps
} from '@components/huddles/HuddleModalScreen/HuddleModalScreen.props';
import { HuddleModalScreenStyle } from '@components/huddles/HuddleModalScreen/HuddleModalScreen.style';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesInteractionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';
import {
    HuddleConfirmPostInterface,
    HuddlePostAgainPutInterface,
    HuddleUpdatePutInterface
} from '@interfaces/post/Post.inteface';
import { HuddleEditableCard } from '@components/huddles/HuddleEditableCard/HuddleEditableCard';

export const HuddleModalScreen = ({
    huddle,
    onPressProfilePhoto,
    onPressInteract,
    onEdited,
    onConfirm
}: HuddleModalScreenProps): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [confirmedUser, setConfirmedUser] =
        useState<HuddleInteractionInterface>();

    const [postAgain, setPostAgain] = useState<boolean>(!!huddle?.canceled);

    const [editing, setEditing] = useState<boolean>(false);

    const editedWhat = useRef<string>(huddle?.what);
    const editedWhere = useRef<string>(huddle?.where);
    const editedWhen = useRef<string>(huddle?.when);

    const loadInteractions = useCallback(() => {
        if (huddle?.id) {
            setTimeout(() => {
                getRequestUser<ResponseHuddlesInteractionsGetInterface>(
                    `huddle/interactions/${huddle?.id}`
                ).subscribe(
                    (response: ResponseHuddlesInteractionsGetInterface) => {
                        if (response?.status) {
                            setConfirmedUser(response?.confirmedUser);
                            setInteractions(response?.data);
                        }
                    }
                );
            }, 400);
        }
    }, [huddle?.id]);

    useEffect(() => loadInteractions(), [loadInteractions]);

    const buttonsViewStyle = useMemo(
        (): StyleProp<ViewStyle> => [
            HuddleModalScreenStyle.buttonsView,
            editing
                ? HuddleModalScreenStyle.contentSpace
                : HuddleModalScreenStyle.contentEnd
        ],
        [editing]
    );

    const editButtonText = useMemo(
        (): string => (editing ? 'Save' : 'Edit'),
        [editing]
    );

    const editHuddle = useCallback(() => {
        setEditing(true);
    }, []);

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
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                onEdited();
            }
        });
    }, [huddle, onEdited]);

    const deleteHuddle = useCallback(() => {
        deleteRequestUser<ResponseInterface>(
            `huddle/${huddle?.id}`
        ).subscribe();
    }, [huddle?.id]);

    const deleteHuddleMessage = useCallback(() => {
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
        ]);
    }, [deleteHuddle]);

    const confirm = useCallback(
        (user: string) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: huddle?.id,
                    sender: huddle?.createdBy,
                    receiver: user
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadInteractions();
                    if (onConfirm) {
                        onConfirm();
                    }
                }
            });
        },
        [huddle?.createdBy, huddle?.id, loadInteractions, onConfirm]
    );

    const renderItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<HuddleInteractionInterface>): JSX.Element => (
            <HuddleInteractionsListItem
                item={item}
                onConfirm={confirm}
                hasConfirmedUser={!!confirmedUser}
            />
        ),
        [confirm, confirmedUser]
    );

    const postHuddleAgain = useCallback(() => {
        putRequestUser<ResponseInterface, HuddlePostAgainPutInterface>(
            'huddle/post',
            {
                id: huddle?.id
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setPostAgain(false);
            }
        });
    }, [huddle?.id]);

    return (
        // SafeAreaView for modal doesn't render as expected
        <View style={[HuddleModalScreenStyle.container, { top }]}>
            <View style={HuddleModalScreenStyle.margin20}>
                <View style={buttonsViewStyle}>
                    {editing && (
                        <TouchableOpacity onPress={deleteHuddleMessage}>
                            <Text style={HuddleModalScreenStyle.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={editing ? saveHuddle : editHuddle}
                    >
                        <Text style={HuddleModalScreenStyle.buttonText}>
                            {editButtonText}
                        </Text>
                    </TouchableOpacity>
                </View>
                {!editing ? (
                    <LargeHuddleListItem
                        item={huddle}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onPressInteract={onPressInteract}
                        style={HuddleModalScreenStyle.huddleListItem}
                    />
                ) : (
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
                        style={HuddleModalScreenStyle.huddleListItem}
                    />
                )}
            </View>
            {!editing && (
                <>
                    {!!confirmedUser && (
                        <>
                            <Text
                                style={HuddleModalScreenStyle.interactionsText}
                            >
                                Confirmed ✅
                            </Text>
                            <HuddleInteractionsListItem
                                item={confirmedUser}
                                onConfirm={confirm}
                                hasConfirmedUser={!!confirmedUser}
                            />
                        </>
                    )}
                    {!!interactions?.length && (
                        <Text style={HuddleModalScreenStyle.interactionsText}>
                            Interactions 👋
                        </Text>
                    )}
                    <FlashList
                        data={interactions}
                        renderItem={renderItem}
                        keyExtractor={(item: HuddleInteractionInterface) =>
                            item?.id?.toString()
                        }
                        estimatedItemSize={68}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
            {postAgain && (
                <TouchableOpacity
                    onPress={postHuddleAgain}
                    style={HuddleModalScreenStyle.postAgainView}
                >
                    <Text style={HuddleModalScreenStyle.postAgainText}>
                        Post again
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

HuddleModalScreen.defaultProps = HuddleModalScreenDefaultProps;
