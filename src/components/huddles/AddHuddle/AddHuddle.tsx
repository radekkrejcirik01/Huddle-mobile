import React, { useCallback, useRef, useState } from 'react';
import { Keyboard, Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddHuddleStyle } from '@components/huddles/AddHuddle/AddHuddle.style';

export const AddHuddle = (): JSX.Element => {
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const number = useRef<number>(0);

    const start = useCallback(() => {
        number.current = Math.floor(Math.random() * (3 + 1));
        setStartHuddle(true);
    }, []);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <>
            <TouchableOpacity onPress={start} style={AddHuddleStyle.view}>
                <Text style={AddHuddleStyle.createText}>Create 👋</Text>
            </TouchableOpacity>
            <Modal
                isVisible={startHuddle}
                content={
                    <StartHuddleModalScreen
                        color={number.current}
                        onClose={hideStartHuddle}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
        </>
    );
};
