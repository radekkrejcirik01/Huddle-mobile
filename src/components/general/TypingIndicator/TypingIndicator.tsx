import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { ReducerProps } from '@store/index/index.props';
import { TypingIndicatorStyle } from '@components/general/TypingIndicator/TypingIndicator.style';
import { TypingIndicatorProps } from '@components/general/TypingIndicator/TypingIndicator.props';
import { TypingIndicatorEnum } from '@components/general/TypingIndicator/TypingIndicator.enum';

export const TypingIndicator = ({
    conversationId,
    type
}: TypingIndicatorProps): JSX.Element => {
    const { isTyping } = useSelector((state: ReducerProps) => state.typing);

    const [typingText, setTypingText] = useState<string>();

    useEffect(() => {
        for (let i = 0; i < isTyping.length; i += 1) {
            if (isTyping[i].conversationId === conversationId) {
                if (isTyping[i].value) {
                    setTypingText(`${isTyping[i].username} is typing..`);
                } else {
                    setTypingText(null);
                }
                return;
            }
        }
    }, [conversationId, isTyping]);

    const animation = useMemo(
        (): string => (typingText ? 'fadeIn' : 'fadeOut'),
        [typingText]
    );

    return (
        <View
            style={
                type === TypingIndicatorEnum.Chat &&
                TypingIndicatorStyle.chatTypeView
            }
        >
            <Animatable.Text
                animation={animation}
                duration={300}
                style={
                    type === TypingIndicatorEnum.Messages
                        ? TypingIndicatorStyle.messageTypeText
                        : TypingIndicatorStyle.chatTypeText
                }
            >
                {typingText}
            </Animatable.Text>
        </View>
    );
};
