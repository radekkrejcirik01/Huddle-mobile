import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useModal } from '@hooks/useModal';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AddContactModalScreen } from '@components/contacts/AddContactModalScreen/AddContactModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddContactButtonStyle } from '@components/contacts/AddContactButton/AddContactButton.style';

export const AddContactButton = (): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    const hideKeyboardAndModal = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    return (
        <>
            <IconButton
                icon={IconEnum.PLUS}
                size={20}
                onPress={showModal}
                style={AddContactButtonStyle.icon}
            />
            <Modal
                isVisible={modalVisible}
                content={
                    <AddContactModalScreen onClose={hideKeyboardAndModal} />
                }
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </>
    );
};
