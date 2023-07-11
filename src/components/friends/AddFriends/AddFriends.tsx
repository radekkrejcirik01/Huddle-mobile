import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useModal } from '@hooks/useModal';
import { useNavigation } from '@hooks/useNavigation';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseNumberInvitesGetInterface } from '@interfaces/response/Response.interface';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { AddFriendsStyle } from '@components/friends/AddFriends/AddFriends.style';
import { Icon } from '@components/general/Icon/Icon';
import { Badge } from '@components/general/Badge/Badge';
import { AddFriendModalScreen } from '@components/friends/AddFriendModalScreen/AddFriendModalScreen';

export const AddFriends = (): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const [badge, setBadge] = useState<number>(0);

    const loadUnseenInvites = () =>
        getRequestUser<ResponseNumberInvitesGetInterface>(
            `unseen-invites`
        ).subscribe((response: ResponseNumberInvitesGetInterface) => {
            if (response?.status) {
                setBadge(response?.number);
            }
        });

    useFocusEffect(
        useCallback(() => {
            loadUnseenInvites();
        }, [])
    );

    const hideKeyboardAndModal = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const openInvitesScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.InvitesScreen);

        setTimeout(() => setBadge(0), 1000);
    }, [navigateTo]);

    return (
        <View style={AddFriendsStyle.view}>
            <TouchableOpacity
                onPress={showModal}
                style={AddFriendsStyle.addView}
            >
                <Text style={AddFriendsStyle.addText}>
                    Add<Text style={AddFriendsStyle.letterSpacing}>🧍‍♀️🧍‍♂️</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={openInvitesScreen}
                style={AddFriendsStyle.invitesView}
            >
                <Icon name={IconEnum.PROFILE} size={22} />
                <Badge value={badge} />
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                content={
                    <AddFriendModalScreen onClose={hideKeyboardAndModal} />
                }
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </View>
    );
};
