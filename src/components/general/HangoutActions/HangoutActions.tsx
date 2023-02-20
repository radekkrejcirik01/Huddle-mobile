import React, { useCallback } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { HangoutActionsStyle } from '@components/general/HangoutActions/HangoutActions.style';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { HangoutActionsProps } from '@components/general/HangoutActions/HangoutActions.props';

export const HangoutActions = ({
    hangoutId,
    usernames
}: HangoutActionsProps): JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openPeopleScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.PickPeopleScreen, {
            hangoutId,
            usernames
        });
    }, [hangoutId, navigateTo, usernames]);

    const openActions = useCallback(() => {
        const options = ['Add people', 'Cancel'].filter(Boolean);

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    openPeopleScreen();
                }
            }
        );
    }, [openPeopleScreen, showActionSheetWithOptions]);

    return (
        <IconButton
            icon={IconEnum.PLUS}
            size={20}
            onPress={openActions}
            style={HangoutActionsStyle.iconButton}
        />
    );
};
