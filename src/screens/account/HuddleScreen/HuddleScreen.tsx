import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import {
    deleteRequestUser,
    getRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
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
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { ReducerProps } from '@store/index/index.props';
import { Back } from '@components/general/Back/Back';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { useRenderInteractions } from '@hooks/useRenderInteractions';
import { SwipeableView } from '@components/general/SwipeableView/SwipeableView';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const HuddleScreen = ({ route }: HuddleScreenProps): JSX.Element => {
    const { huddle } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();
    const openPhoto = useOpenPhoto();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [confirmedUser, setConfirmedUser] =
        useState<HuddleInteractionInterface>();
    const [canceled, setCanceled] = useState<boolean>(!!huddle?.canceled);
    const [editing, setEditing] = useState<boolean>(false);

    const editedWhat = useRef<string>(huddle?.what);
    const editedWhere = useRef<string>(huddle?.where);
    const editedWhen = useRef<string>(huddle?.when);

    const created = huddle?.createdBy === username;

    const loadInteractions = useCallback(() => {
        if (created) {
            getRequestUser<ResponseHuddlesInteractionsGetInterface>(
                `huddle/interactions/${huddle?.id}`
            ).subscribe((response: ResponseHuddlesInteractionsGetInterface) => {
                if (response?.status) {
                    setConfirmedUser(response?.confirmedUser);
                    setInteractions(response?.data);
                }
            });
        }
    }, [created, huddle?.id]);

    useEffect(() => loadInteractions(), [loadInteractions]);

    const { onPressInteract } = useRenderHuddles();
    const { renderItem, keyExtractor, refreshControl } = useRenderInteractions(
        huddle,
        !!confirmedUser,
        loadInteractions
    );

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
        <>
            <FlashList
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
                                        openPhoto(huddle?.profilePhoto)
                                    }
                                    onPressInteract={onPressInteract}
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
                                                isConfirmed={!!confirmedUser}
                                            />
                                        </SwipeableView>
                                    </>
                                )}
                                {(!!interactions?.length || !confirmedUser) && (
                                    <Text style={HuddleScreenStyle.title}>
                                        Interactions 👋
                                    </Text>
                                )}
                            </>
                        )}
                    </>
                }
                scrollEnabled={!editing}
                data={interactions}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={10}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator space={15} />}
                ListFooterComponent={
                    <>
                        <Text style={HuddleScreenStyle.title}>Comments 💬</Text>
                        <ScrollView />
                    </>
                }
            />
            {canceled && (
                <TouchableOpacity
                    onPress={repostHuddle}
                    style={HuddleScreenStyle.repostView}
                >
                    <Text style={HuddleScreenStyle.repostText}>Post again</Text>
                </TouchableOpacity>
            )}
        </>
    );
};
