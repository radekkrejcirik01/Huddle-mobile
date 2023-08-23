import React, { ReactElement, useCallback, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { SwipeableViewStyle } from '@components/general/SwipeableView/SwipeableView.style';
import {
    SwipeableViewDefaultProps,
    SwipeableViewProps
} from '@components/general/SwipeableView/SwipeableView.props';

export const SwipeableView = ({
    text,
    onAction,
    children,
    style
}: SwipeableViewProps): ReactElement => {
    const swipeableRef = useRef<Swipeable>();

    const handlePress = useCallback(() => {
        swipeableRef?.current?.close();

        onAction();
    }, [onAction]);

    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={swipeableRef}
                containerStyle={SwipeableViewStyle.swipeableContainer}
                renderRightActions={() => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handlePress}
                        style={[SwipeableViewStyle.view, style]}
                    >
                        <Text style={SwipeableViewStyle.text}>{text}</Text>
                    </TouchableOpacity>
                )}
            >
                {children}
            </Swipeable>
        </GestureHandlerRootView>
    );
};

SwipeableView.defaultProps = SwipeableViewDefaultProps;
