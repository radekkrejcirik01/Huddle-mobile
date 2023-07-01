import React from 'react';
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
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfileTabHeaderProps } from '@components/profile/ProfileTabHeader/ProfileTabHeader.props';

export const ProfileTabHeader = ({
    onCreateHuddlePress
}: ProfileTabHeaderProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const openProfilePhoto = useOpenProfilePhoto();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={ProfileTabHeaderStyle.container}>
            <View style={ProfileTabHeaderStyle.profileContent}>
                <View style={ProfileTabHeaderStyle.flex} />
                <Text style={ProfileTabHeaderStyle.nameText}>{firstname}</Text>
                <View style={ProfileTabHeaderStyle.menuView}>
                    <IconButton
                        icon={IconEnum.MENU}
                        size={22}
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.SettingsScreen)
                        }
                    />
                </View>
            </View>
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
            <View style={ProfileTabHeaderStyle.buttonsContainer}>
                <TouchableOpacity
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.FriendsScreen)
                    }
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        Add friend
                        <Text style={ProfileTabHeaderStyle.letterSpacing}>
                            🧍‍♀️🧍‍♂️
                        </Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onCreateHuddlePress}
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        Create Huddle 👋
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.FriendsScreen)
                    }
                    style={ProfileTabHeaderStyle.buttonView}
                >
                    <Text style={ProfileTabHeaderStyle.buttonText}>
                        New chat 💬
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
