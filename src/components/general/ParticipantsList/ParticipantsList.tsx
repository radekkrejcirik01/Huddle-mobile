import React, { useCallback } from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    Participant,
    ParticipantsListProps
} from '@components/general/ParticipantsList/ParticipantsList.props';
import { ParticipantsListStyle } from '@components/general/ParticipantsList/ParticipantsList.style';

export const ParticipantsList = ({
    onPressUser,
    usernames
}: ParticipantsListProps): JSX.Element => {
    const Render = useCallback(
        (): JSX.Element => (
            <>
                {usernames?.map((value: Participant) => (
                    <TouchableOpacity
                        key={value.username}
                        onPress={() => onPressUser(value)}
                        onLongPress={() => onPressUser(value)}
                        style={[
                            ParticipantsListStyle.touchableOpacity,
                            value?.confirmed === 0 &&
                                ParticipantsListStyle.opacity
                        ]}
                    >
                        <FastImage
                            style={ParticipantsListStyle.image}
                            source={{
                                uri: value?.profilePhoto
                            }}
                        />
                        <Text style={ParticipantsListStyle.text}>
                            {value?.firstname}
                        </Text>
                    </TouchableOpacity>
                ))}
            </>
        ),
        [onPressUser, usernames]
    );
    return <Render />;
};
