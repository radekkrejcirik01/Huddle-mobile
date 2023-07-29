import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useModal } from '@hooks/useModal';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ProfileTabHeader } from '@components/profile/ProfileTabHeader/ProfileTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddFriendModalScreen } from '@components/friends/AddFriendModalScreen/AddFriendModalScreen';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ProfileScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { top } = useSafeAreaInsets();
    const { modalVisible, showModal, hideModal } = useModal();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const loadHuddles = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = 'user-huddles';
                if (lastId) {
                    endpoint += `/${lastId}`;
                }

                getRequestUser<ResponseHuddlesGetInterface>(endpoint).subscribe(
                    (response: ResponseHuddlesGetInterface) => {
                        if (response?.status) {
                            if (!lastId) {
                                setHuddles(response?.data);
                                return;
                            }

                            if (lastId && !!response?.data?.length) {
                                setHuddles((value) =>
                                    value.concat(response?.data)
                                );
                            }
                        }
                    }
                );
            }
        },
        [username]
    );

    useEffect(() => loadHuddles(), [loadHuddles]);

    const onModalClose = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onPostHuddlePress = useCallback(() => {
        setModalContent(
            <StartHuddleModalScreen
                onCreate={loadHuddles}
                onClose={onModalClose}
            />
        );
        showModal();
    }, [loadHuddles, onModalClose, showModal]);

    const onAddFriendPress = useCallback(() => {
        setModalContent(<AddFriendModalScreen onClose={onModalClose} />);
        showModal();
    }, [onModalClose, showModal]);

    const {
        renderSmallItem,
        keyExtractor,
        refreshControl,
        onScrollBeginDrag,
        onEndReachedSmallItem
    } = useRenderHuddles(huddles, loadHuddles);

    return (
        <View style={[ProfileScreenStyle.container, { paddingTop: top }]}>
            <FlashList
                ListHeaderComponent={
                    <ProfileTabHeader
                        onAddFriendPress={onAddFriendPress}
                        onPostHuddlePress={onPostHuddlePress}
                    />
                }
                ListHeaderComponentStyle={ProfileScreenStyle.header}
                data={huddles}
                extraData={huddles}
                renderItem={renderSmallItem}
                numColumns={3}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={onScrollBeginDrag}
                onEndReached={onEndReachedSmallItem}
                contentContainerStyle={ProfileScreenStyle.listContentContainer}
                ListEmptyComponent={
                    <>
                        <Text style={ProfileScreenStyle.description}>
                            place for those colorful pretty{'\n'}Huddles
                        </Text>
                        <TouchableOpacity
                            onPress={onPostHuddlePress}
                            style={ProfileScreenStyle.descriptionButtonView}
                        >
                            <Text
                                style={ProfileScreenStyle.descriptionButtonText}
                            >
                                post huddle
                            </Text>
                        </TouchableOpacity>
                    </>
                }
            />
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                backdropOpacity={0.7}
                onClose={onModalClose}
            />
        </View>
    );
};
