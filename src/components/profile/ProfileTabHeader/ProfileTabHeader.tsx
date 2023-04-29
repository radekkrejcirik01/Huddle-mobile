import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ProfileTabHeaderStyle } from '@components/profile/ProfileTabHeader/ProfileTabHeader.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { useOpenPhoto } from '@hooks/useOpenPhoto';

export const ProfileTabHeader = (): JSX.Element => {
    const { username, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const openPhoto = useOpenPhoto();

    const openProfile = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.ProfileScreen),
        [navigateTo]
    );

    return (
        <SafeAreaView style={ProfileTabHeaderStyle.container}>
            <View style={ProfileTabHeaderStyle.imageContainer}>
                <TouchableOpacity onPress={() => openPhoto(profilePhoto)}>
                    <FastImage
                        source={{
                            uri: profilePhoto
                        }}
                        style={ProfileTabHeaderStyle.image}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={openProfile}>
                <Text style={ProfileTabHeaderStyle.usernameText}>
                    {username}
                </Text>
            </TouchableOpacity>
            <View style={ProfileTabHeaderStyle.buttonContainer}>
                <IconButton
                    icon={IconEnum.MORE}
                    onPress={openProfile}
                    size={22}
                />
            </View>
        </SafeAreaView>
    );
};
