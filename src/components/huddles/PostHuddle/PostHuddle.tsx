import React, { useState } from 'react';
import { Keyboard, Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { PostHuddleStyle } from '@components/huddles/PostHuddle/PostHuddle.style';
import { PostHuddleProps } from '@components/huddles/PostHuddle/PostHuddle.props';

export const PostHuddle = ({
    onCreateHuddle
}: PostHuddleProps): JSX.Element => {
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setStartHuddle(true)}
                style={PostHuddleStyle.view}
            >
                <Text>👍</Text>
            </TouchableOpacity>
            <Modal
                isVisible={startHuddle}
                content={
                    <StartHuddleModalScreen
                        onCreate={onCreateHuddle}
                        onClose={hideStartHuddle}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
        </>
    );
};
