import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@hooks/useNavigation';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ChatsTabIconStyle } from '@components/chats/ChatsTabIcon/ChatsTabIcon.style';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseNumberInvitesGetInterface } from '@interfaces/response/Response.interface';
import { Badge } from '@components/general/Badge/Badge';

export const ChatsTabIcon = (): JSX.Element => {
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

    const openContacts = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.FriendsScreen);

        setTimeout(() => setBadge(0), 1000);
    }, [navigateTo]);

    return (
        <TouchableOpacity onPress={openContacts}>
            <Text style={ChatsTabIconStyle.text}>💬</Text>
            <Badge value={badge} />
        </TouchableOpacity>
    );
};
