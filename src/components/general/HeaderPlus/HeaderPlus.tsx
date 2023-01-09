import React, { useCallback, useMemo, useState } from 'react';
import { IconEnum } from '@components/icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { HeaderPlusStyle } from '@components/general/HeaderPlus/HeaderPlus.style';
import { useModal } from '@hooks/useModal';
import { Alert, Text, View } from 'react-native';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const HeaderPlus = (): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    const [username, setUsername] = useState<string>();

    const onSend = useCallback(() => {
        Alert.alert(username);
    }, [username]);

    const content = useMemo(
        (): JSX.Element => (
            <View style={HeaderPlusStyle.modalContainer}>
                <Text style={HeaderPlusStyle.title}>Add a friend</Text>
                <Input
                    iconLeft={<Text>✉️</Text>}
                    placeholder="Username"
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
        [onSend]
    );

    return (
        <>
            <IconButton
                icon={IconEnum.PLUS}
                size={22}
                onPress={showModal}
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
