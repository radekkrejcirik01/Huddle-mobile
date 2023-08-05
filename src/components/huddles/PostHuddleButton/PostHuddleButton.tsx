import React, { useState } from 'react';
import { Keyboard, Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { PostHuddleModalScreen } from '@components/huddles/PostHuddleModalScreen/PostHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { PostHuddleButtonStyle } from '@components/huddles/PostHuddleButton/PostHuddleButton.style';
import { PostHuddleButtonProps } from '@components/huddles/PostHuddleButton/PostHuddleButton.props';

export const PostHuddleButton = ({
    onCreateHuddle
}: PostHuddleButtonProps): JSX.Element => {
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setStartHuddle(true)}
                style={PostHuddleButtonStyle.view}
            >
                <Text>👍</Text>
            </TouchableOpacity>
            <Modal
                isVisible={startHuddle}
                content={
                    <PostHuddleModalScreen
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
