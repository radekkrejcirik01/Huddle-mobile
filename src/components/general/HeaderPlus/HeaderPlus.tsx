import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { IconEnum } from '@components/icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { HeaderPlusStyle } from '@components/general/HeaderPlus/HeaderPlus.style';
import { useModal } from '@hooks/useModal';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { PeopleCreateInvitationPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const HeaderPlus = (): JSX.Element => {
    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { showActionSheetWithOptions } = useActionSheet();

    const { modalVisible, showModal, hideModal } = useModal();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [username, setUsername] = useState<string>();

    const onSend = useCallback(() => {
        postRequest<ResponseInterface, PeopleCreateInvitationPostInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/create/people/invitation',
            {
                user,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                Alert.alert(response?.message);

                if (!response?.message?.includes('exists')) {
                    setUsername(null);
                }
            }
        });
    }, [user, username]);

    const content = useMemo(
        (): JSX.Element => (
            <View style={HeaderPlusStyle.modalContainer}>
                <Text style={HeaderPlusStyle.title}>Add a friend</Text>
                <Input
                    iconLeft={<Text>✉️</Text>}
                    placeholder="Username"
                    value={username}
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    inputStyle={HeaderPlusStyle.input}
                    viewStyle={HeaderPlusStyle.inputView}
                    placeholderTextColor={COLORS.LIGHTGRAY}
                />
                <TouchableOpacity
                    onPress={onSend}
                    style={HeaderPlusStyle.touchableOpacity}
                >
                    <Text style={HeaderPlusStyle.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        ),
        [onSend, username]
    );

    const showActionSheet = useCallback(() => {
        const options = ['Add a friend', 'Create a group hangout', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    showModal();
                }
                if (selectedIndex === 1) {
                    navigateTo(
                        AccountStackNavigatorEnum.CreateGroupHangoutScreen
                    );
                }
            }
        );
    }, [navigateTo, showActionSheetWithOptions, showModal]);

    return (
        <>
            <IconButton
                icon={IconEnum.PLUS}
                size={22}
                onPress={showActionSheet}
                style={HeaderPlusStyle.iconButton}
            />
            <Modal
                isVisible={modalVisible}
                content={content}
                onClose={hideModal}
            />
        </>
    );
};
