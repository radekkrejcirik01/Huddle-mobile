import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import {
    HuddleInteractionInterface,
    HuddleModalScreenDefaultProps,
    HuddleModalScreenProps
} from '@components/huddles/HuddleModalScreen/HuddleModalScreen.props';
import { HuddleModalScreenStyle } from '@components/huddles/HuddleModalScreen/HuddleModalScreen.style';
import { HuddlesListItem } from '@components/huddles/HuddlesListItem/HuddlesListItem';
import {
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
    HuddleUpdatePutInterface
} from '@interfaces/post/Post.inteface';
import { HuddleEditableCard } from '@components/huddles/HuddleEditableCard/HuddleEditableCard';

export const HuddleModalScreen = ({
    huddle,
    onPressProfilePhoto,
    onPressInteract,
    onEdited
}: HuddleModalScreenProps): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [confirmedUser, setConfirmedUser] =
        useState<HuddleInteractionInterface>();

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

    const editButtonText = useMemo(
        (): string => (editing ? 'Save' : 'Edit'),
        [editing]
    );

    const edit = useCallback(() => {
        setEditing(true);
    }, []);

    const save = useCallback(() => {
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
                }
            });
        },
        [huddle?.createdBy, huddle?.id, loadInteractions]
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

    return (
        // SafeAreaView for modal doesn't render as expected
        <View style={[HuddleModalScreenStyle.container, { top }]}>
            <View style={HuddleModalScreenStyle.margin20}>
                <TouchableOpacity
                    onPress={editing ? save : edit}
                    style={HuddleModalScreenStyle.editView}
                >
                    <Text style={HuddleModalScreenStyle.editText}>
                        {editButtonText}
                    </Text>
                </TouchableOpacity>
                {!editing ? (
                    <HuddlesListItem
                        item={huddle}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onPressInteract={onPressInteract}
                        style={HuddleModalScreenStyle.huddlesListItem}
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
                        style={HuddleModalScreenStyle.huddlesListItem}
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
        </View>
    );
};

HuddleModalScreen.defaultProps = HuddleModalScreenDefaultProps;
