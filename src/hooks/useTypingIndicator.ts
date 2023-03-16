import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';

export const useTypingIndicator = (
    conversationId: number
): {
    isTyping: boolean;
} => {
    const { isTyping: typing } = useSelector(
        (state: ReducerProps) => state.typing
    );

    const [isTyping, setIsTyping] = useState<boolean>(false);

    useEffect(() => {
        for (let i = 0; i < typing.length; i += 1) {
            if (typing[i].conversationId === conversationId) {
                if (typing[i].value) {
                    setIsTyping(true);
                } else {
                    setIsTyping(false);
                }
                return;
            }
        }
    }, [conversationId, isTyping, typing]);

    return { isTyping };
};
