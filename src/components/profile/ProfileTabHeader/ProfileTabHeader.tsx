import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ProfileTabHeaderStyle } from '@components/profile/ProfileTabHeader/ProfileTabHeader.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ProfileTabHeader = (): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const openProfilePhoto = useOpenProfilePhoto();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openPeopleScreen = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.PeopleScreen),
        [navigateTo]
    );

    const openProfileDetails = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.ProfileDetailScreen),
        [navigateTo]
    );

    return (
        <View style={ProfileTabHeaderStyle.container}>
            <View style={ProfileTabHeaderStyle.profileContent}>
                <TouchableOpacity
                    onPress={() => openProfilePhoto(firstname, profilePhoto)}
                >
                    <FastImage
                        source={{
                            uri: profilePhoto
                        }}
                        style={ProfileTabHeaderStyle.image}
                    />
                </TouchableOpacity>
                <Text style={ProfileTabHeaderStyle.nameText}>{firstname}</Text>
            </View>
            <View style={ProfileTabHeaderStyle.buttonsContainer}>
                <TouchableOpacity
                    onPress={openPeopleScreen}
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        Add people 👨‍👩‍👧‍👦
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openProfileDetails}
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        Edit Profile 🖋️
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        Huddles visibility 👀
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
