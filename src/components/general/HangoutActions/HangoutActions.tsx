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
    hangout
}: HangoutActionsProps): JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openPeopleScreen = useCallback(() => {
        const usernames = [];
        for (let i = 0; i < hangout.usernames.length; i += 1) {
            usernames.push(hangout.usernames[i].username);
        }
        navigateTo(AccountStackNavigatorEnum.PickPeopleScreen, {
            hangoutId,
            usernames
        });
    }, [hangout.usernames, hangoutId, navigateTo]);

    const openHangoutEdit = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutDetailScreen, {
            hangoutId,
            hangout
        });
    }, [hangoutId, hangout, navigateTo]);

    const openActions = useCallback(() => {
        const options = ['Add people', 'Edit hangout', 'Cancel'].filter(
            Boolean
        );

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
