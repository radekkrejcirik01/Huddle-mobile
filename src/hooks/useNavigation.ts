import { useCallback, useEffect } from 'react';
import { useNavigation as useNavigationModule } from '@react-navigation/native';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

type ScreenProp = RootStackNavigatorEnum | AccountStackNavigatorEnum;

export const useNavigation = (
    stack?: RootStackNavigatorEnum,
    onFocus?: () => void
): {
    navigateTo: (screen: ScreenProp, params?: object) => void;
    navigateBack: () => void;
} => {
    const navigation = useNavigationModule();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (onFocus) onFocus();
        });
        return unsubscribe;
    }, [onFocus, navigation]);

    const navigateTo = useCallback(
        (screen: ScreenProp, params: object) => {
            navigation.navigate(
                stack as never,
                {
                    screen,
                    params
                } as never
            );
        },
        [navigation, stack]
    );

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return { navigateTo, navigateBack };
};
