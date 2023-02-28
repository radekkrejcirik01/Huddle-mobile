import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { SwipeableViewStyle } from '@components/general/SwipeableView/SwipeableView.style';
import { SwipeableViewProps } from '@components/general/SwipeableView/SwipeableView.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import COLORS from '@constants/COLORS';

export const SwipeableView = ({
    children,
    onDelete
}: SwipeableViewProps): ReactElement => {
    const swipeableRef = useRef<Swipeable>();
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    // prevention before memory leaks
    const clearAutoCloseTimeout = useCallback(() => {
        clearTimeout(timeoutRef?.current);
    }, [timeoutRef]);

    const startAutoClose = () => {
        if (timeoutRef?.current) clearAutoCloseTimeout();

        timeoutRef.current = setTimeout(() => {
            swipeableRef?.current?.close();
            clearAutoCloseTimeout();
        }, 5000);
    };

    const handlePress = useCallback(
        (callback: () => void) => {
            clearAutoCloseTimeout();
            swipeableRef?.current?.close();
            callback();
        },
        [clearAutoCloseTimeout]
    );

    // prevention before memory leaks
    useEffect(() => clearAutoCloseTimeout, [clearAutoCloseTimeout]);

    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={swipeableRef}
                containerStyle={SwipeableViewStyle.swipeableContainer}
                onSwipeableWillOpen={startAutoClose}
                onSwipeableWillClose={clearAutoCloseTimeout}
                renderRightActions={() => (
                    <TouchableOpacity
                        onPress={() => handlePress(onDelete)}
                        style={{
                            width: 100,
                            height: 55,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.WHITE,
                                fontWeight: '500'
                            }}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                )}
            >
                {children}
            </Swipeable>
        </GestureHandlerRootView>
    );
};
