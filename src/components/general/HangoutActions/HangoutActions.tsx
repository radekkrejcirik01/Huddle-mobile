import React, { useCallback } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HangoutActionsStyle } from '@components/general/HangoutActions/HangoutActions.style';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { HangoutActionsProps } from '@components/general/HangoutActions/HangoutActions.props';

export const HangoutActions = ({
    hangoutId
}: HangoutActionsProps): JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openPeopleScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.AddHangoutInvitationsScreen, {
            hangoutId
        });
    }, [hangoutId, navigateTo]);

    const openHangoutEdit = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutDetailsScreen, {
            hangoutId
        });
    }, [hangoutId, navigateTo]);

    const openActions = useCallback(() => {
        const options = ['Add people', 'Edit hangout', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    openPeopleScreen();
                }

                if (selectedIndex === 1) {
                    openHangoutEdit();
                }
            }
        );
    }, [openHangoutEdit, openPeopleScreen, showActionSheetWithOptions]);

    return (
        <IconButton
            icon={IconEnum.PLUS}
            size={20}
            onPress={openActions}
            style={HangoutActionsStyle.iconButton}
        />
    );
};
