import { useCallback } from 'react';
import { useNavigation } from '@hooks/useNavigation';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useOpenProfilePhoto = (): ((
    name: string,
    profilePhoto: string
) => void) => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return useCallback(
        (name: string, profilePhoto: string) =>
            navigateTo(
                AccountStackNavigatorEnum.ProfilePhotoScreen as never,
                {
                    name,
                    profilePhoto
                } as never
            ),
        [navigateTo]
    );
};
