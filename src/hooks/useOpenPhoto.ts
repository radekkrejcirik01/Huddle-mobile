import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useOpenPhoto = (): ((url: string) => void) => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    return (url: string) =>
        navigateTo(
            AccountStackNavigatorEnum.PictureScreen as never,
            {
                picture: url
            } as never
        );
};
