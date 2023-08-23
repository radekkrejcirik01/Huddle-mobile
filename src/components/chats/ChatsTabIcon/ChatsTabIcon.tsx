import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ChatsTabIconStyle } from '@components/chats/ChatsTabIcon/ChatsTabIcon.style';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { setUnseenInvites } from '@store/Invites';

export const ChatsTabIcon = (): JSX.Element => {
    const { unseenInvites } = useSelector(
        (state: ReducerProps) => state.invites
    );
    const dispatch = useDispatch();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openContacts = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ContactsScreen);

        setTimeout(() => dispatch(setUnseenInvites(0)), 1000);
    }, [dispatch, navigateTo]);

    return (
        <TouchableOpacity onPress={openContacts}>
            <Text style={ChatsTabIconStyle.text}>💬</Text>
            <Badge value={unseenInvites} />
        </TouchableOpacity>
    );
};
