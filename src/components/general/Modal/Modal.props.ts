import { ModalProps as DefaultModalProps } from 'react-native-modal';

export interface ModalProps extends Partial<DefaultModalProps> {
    isVisible: boolean;
    content: JSX.Element;
    onClose: () => void;
}
