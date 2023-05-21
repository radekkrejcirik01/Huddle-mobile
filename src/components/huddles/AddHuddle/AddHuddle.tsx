import React, { useState } from 'react';
import { Keyboard, Text } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddHuddleStyle } from '@components/huddles/AddHuddle/AddHuddle.style';

export const AddHuddle = (): JSX.Element => {
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setStartHuddle(true)}
                style={AddHuddleStyle.view}
            >
                <Icon
                    name={IconEnum.PLUS}
                    size={12}
                    style={AddHuddleStyle.plusIcon}
                />
                <Text style={AddHuddleStyle.addButtonText}>Add</Text>
            </TouchableOpacity>
            <Modal
                isVisible={startHuddle}
                content={<StartHuddleModalScreen onClose={hideStartHuddle} />}
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
        </>
    );
};
