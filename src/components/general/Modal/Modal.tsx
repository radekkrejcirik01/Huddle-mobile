import React from 'react';
import ModalComponent from 'react-native-modal';
import { ModalProps } from '@components/general/Modal/Modal.props';
import { ModalStyle } from '@components/general/Modal/Modal.style';

export const Modal = ({
    isVisible,
    content,
    onClose,
    ...props
}: ModalProps): JSX.Element => (
    <ModalComponent
        isVisible={isVisible}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        animationInTiming={400}
        animationOutTiming={100}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        avoidKeyboard
        propagateSwipe
        backdropOpacity={0.3}
        style={ModalStyle.container}
        {...props}
    >
        {content}
    </ModalComponent>
);
