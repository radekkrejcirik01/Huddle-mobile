import React from 'react';
import { KeyboardAvoidingView as KeyboardAvoidingViewDefault } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    KeyboardAvoidingViewDefaultProps,
    KeyboardAvoidingViewProps
} from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView.props';
import { isiOS } from '@functions/checking-functions';
import { useKeyboard } from '@hooks/useKeyboard';

export const KeyboardAvoidingView = ({
    keyboardVerticalOffset,
    ...props
}: KeyboardAvoidingViewProps): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { isKeyboardVisible } = useKeyboard();
    return (
        <KeyboardAvoidingViewDefault
            behavior={isiOS() ? 'position' : 'padding'}
            enabled={isKeyboardVisible}
            keyboardVerticalOffset={
                keyboardVerticalOffset && keyboardVerticalOffset + top
            }
            {...props}
        />
    );
};

KeyboardAvoidingView.defaultProps = KeyboardAvoidingViewDefaultProps;
