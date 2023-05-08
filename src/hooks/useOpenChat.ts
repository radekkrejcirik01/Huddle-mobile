import { useCallback } from 'react';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const useOpenChat = (): ((
    username: string,
    name: string,
    profilePhoto: string
) => void) => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return useCallback(
        (name: string, profilePhoto: string, username: string) =>
            navigateTo(AccountStackNavigatorEnum.ConversationScreen, {
                name,
                profilePhoto,
                username
            }),
        [navigateTo]
    );
};
