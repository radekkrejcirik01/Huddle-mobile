import React from 'react';
import { Text } from 'react-native';
import Toast, {
    ToastConfig,
    ToastConfigParams
} from 'react-native-toast-message';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ToastMessageStyle } from '@components/general/ToastMessage/ToastMessage.style';

export const ToastMessage = (): JSX.Element => {
    const toastConfig: ToastConfig = {
        success: (
            internalState: ToastConfigParams<{
                text1: string;
                text2: string;
                onPress: () => void;
            }>
        ) => (
            <TouchableOpacity
                activeOpacity={1}
                onPress={internalState?.onPress}
                style={ToastMessageStyle.touchableOpacity}
            >
                {internalState?.text1 && (
                    <Text style={ToastMessageStyle.title}>
                        {internalState.text1}
                    </Text>
                )}
                {internalState?.text2 && (
                    <Text style={ToastMessageStyle.body}>
                        {internalState.text2}
                    </Text>
                )}
            </TouchableOpacity>
        )
    };

    return <Toast config={toastConfig} onPress={Toast.hide} />;
};
