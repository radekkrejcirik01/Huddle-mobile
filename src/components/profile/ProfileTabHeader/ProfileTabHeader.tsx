import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
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
import { setProfilePhotoAction } from '@store/UserReducer';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseUploadImageInterface } from '@interfaces/response/Response.interface';
import { UploadProfileImageInterface } from '@interfaces/post/Post.inteface';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ProfileTabHeader = ({
    onCreateHuddlePress,
    onAddFriendPress
}: ProfileTabHeaderProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const dispatch = useDispatch();
    const openProfilePhoto = useOpenProfilePhoto();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showActionSheetWithOptions } = useActionSheet();

    const changeProfilePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            dispatch(setProfilePhotoAction(image?.path));

            postRequestUser<
                ResponseUploadImageInterface,
                UploadProfileImageInterface
            >('photo', {
                buffer: base64,
                fileName: image.filename
            }).subscribe((response: ResponseUploadImageInterface) => {
                if (!response?.status) {
                    Alert.alert("Sorry, we couldn't upload this image 😔");
                }
            });
        });
    }, [dispatch]);

    const onPressProfilePhoto = useCallback(() => {
        if (!profilePhoto) {
            changeProfilePhoto();
            return;
        }

        const options = ['View', `Edit`, 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                title: 'Your profile photo',
                cancelButtonIndex: 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    openProfilePhoto(firstname, profilePhoto);
                }
                if (selectedIndex === 1) {
                    changeProfilePhoto();
                }
            }
        );
    }, [
        changeProfilePhoto,
        firstname,
        openProfilePhoto,
        profilePhoto,
        showActionSheetWithOptions
    ]);

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
            <TouchableOpacity onPress={onPressProfilePhoto}>
                <ProfilePhoto name={firstname} photo={profilePhoto} size={65} />
            </TouchableOpacity>
            <View style={ProfileTabHeaderStyle.buttonsContainer}>
                <TouchableOpacity
                    onPress={onAddFriendPress}
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
                        Start chat 💬
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
