import { useCallback, useState } from 'react';

export const useModal = (
    defaultVisibility?: boolean
): {
    modalVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
} => {
    const [modalVisible, setModalVisible] = useState<boolean>(
        defaultVisibility || false
    );

    const showModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    return { modalVisible, showModal, hideModal };
};
