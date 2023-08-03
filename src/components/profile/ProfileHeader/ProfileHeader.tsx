import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileHeaderStyle } from '@components/profile/ProfileHeader/ProfileHeader.style';

export const ProfileHeader = (): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            onPress={() => navigateTo(AccountStackNavigatorEnum.ProfileScreen)}
            style={ProfileHeaderStyle.view}
        >
            <ProfilePhoto name={firstname} photo={profilePhoto} size={40} />
        </TouchableOpacity>
    );
};