import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { isiOS } from '@functions/checking-functions';

export const useKeyboard = (): {
    isKeyboardVisible: boolean;
} => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

    const keyboardShow = isiOS() ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHide = isiOS() ? 'keyboardWillHide' : 'keyboardDidHide';

    useEffect(() => {
        const subscribers = [
            Keyboard.addListener(keyboardShow, () => {
                setIsKeyboardVisible(true);
            }),
            Keyboard.addListener(keyboardHide, () => {
                setIsKeyboardVisible(false);
            })
        ];

        return () => {
            subscribers.forEach((subscriber) => {
                subscriber.remove();
            });
        };
    }, [keyboardHide, keyboardShow]);

    return { isKeyboardVisible };
};
