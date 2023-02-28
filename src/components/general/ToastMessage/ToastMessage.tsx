import React from 'react';
import { NativeModules, Text } from 'react-native';
import Toast, {
    ToastConfig,
    ToastConfigParams
} from 'react-native-toast-message';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ToastMessageStyle } from '@components/general/ToastMessage/ToastMessage.style';

export const ToastMessage = (): JSX.Element => {
    const { StatusBarManager } = NativeModules;
    const height = StatusBarManager.HEIGHT - 30;

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
                onPress={internalState.onPress}
                style={[
                    ToastMessageStyle.touchableOpacity,
                    {
                        top: height
                    }
                ]}
            >
                <Text style={ToastMessageStyle.title}>
                    {internalState.text1}
                </Text>
                <Text style={ToastMessageStyle.body}>
                    {internalState.text2}
                </Text>
            </TouchableOpacity>
        )
    };

    return <Toast config={toastConfig} />;
};
