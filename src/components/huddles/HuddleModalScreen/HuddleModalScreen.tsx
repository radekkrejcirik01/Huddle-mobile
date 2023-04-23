import React, { useCallback, useEffect, useState } from 'react';
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
import { getRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesInteractionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';
import { HuddleConfirmPostInterface } from '@interfaces/post/Post.inteface';

export const HuddleModalScreen = ({
    huddle,
    onPressProfilePhoto,
    onPressInteract,
    onConfirm
}: HuddleModalScreenProps): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const [interactions, setInteractions] = useState<
        Array<HuddleInteractionInterface>
    >([]);
    const [confirmedUser, setConfirmedUser] = useState<string>();

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

    const edit = useCallback(() => {}, []);

    const confirm = useCallback(
        (username: string) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: huddle?.id,
                    sender: huddle?.createdBy,
                    receiver: username
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

    return (
        // SafeAreaView for modal doesn't work as expected
        <View style={[HuddleModalScreenStyle.container, { top }]}>
            <View style={HuddleModalScreenStyle.margin20}>
                <TouchableOpacity
                    onPress={edit}
                    style={HuddleModalScreenStyle.editView}
                >
                    <Text style={HuddleModalScreenStyle.editText}>Edit</Text>
                </TouchableOpacity>
                <HuddlesListItem
                    item={huddle}
                    onPressProfilePhoto={onPressProfilePhoto}
                    onPressInteract={onPressInteract}
                    style={HuddleModalScreenStyle.huddlesListItem}
                />
            </View>
            <Text style={HuddleModalScreenStyle.interactionsText}>
                Interactions 👋
            </Text>
            <FlashList
                data={interactions}
                renderItem={renderItem}
                keyExtractor={(item: HuddleInteractionInterface) =>
                    item?.id?.toString()
                }
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

HuddleModalScreen.defaultProps = HuddleModalScreenDefaultProps;
