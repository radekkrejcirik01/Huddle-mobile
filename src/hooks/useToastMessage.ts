import Toast from 'react-native-toast-message';

export const useToastMessage = (): {
    showToast: (title: string, body: string, onPress: () => void) => void;
} => {
    const showToast = (title: string, body: string, onPress: () => void) => {
        Toast.show({
            type: 'success',
            text1: title,
            text2: body,
            onPress: () => {
                Toast.hide();
                onPress();
            }
        });
    };

    return { showToast };
};
