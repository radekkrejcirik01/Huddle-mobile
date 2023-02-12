import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { ReducerProps } from '@store/index/index.props';
import { TypingIndicatorStyle } from '@components/general/TypingIndicator/TypingIndicator.style';

export const TypingIndicator = (): JSX.Element => {
    const { isTyping } = useSelector((state: ReducerProps) => state.typing);

    const [typingText, setTypingText] = useState<string>();

    useEffect(() => {
        if (isTyping.length) {
            let people = '';
            for (let i = 0; i < isTyping.length; i += 1) {
                if (i === 0) {
                    people = isTyping[i];
                } else {
                    people += `, ${isTyping[i]}`;
                }
            }
            setTypingText(`${people} is typing..`);
        } else {
            setTypingText(null);
        }
    }, [isTyping]);

    const animation = useMemo(
        (): string => (typingText ? 'fadeIn' : 'fadeOut'),
        [typingText]
    );

    return (
        <View style={TypingIndicatorStyle.view}>
            <Animatable.Text
                animation={animation}
                duration={300}
                style={TypingIndicatorStyle.text}
            >
                {typingText}
            </Animatable.Text>
        </View>
    );
};
