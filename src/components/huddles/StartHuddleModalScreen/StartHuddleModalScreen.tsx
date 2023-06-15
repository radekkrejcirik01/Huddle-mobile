import React, { useCallback, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { StartHuddleModalScreenStyle } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddHuddlePostInterface } from '@interfaces/post/Post.inteface';
import { StartHuddleModalScreenProps } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen.props';
import { HuddleEditableCard } from '@components/huddles/HuddleEditableCard/HuddleEditableCard';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const StartHuddleModalScreen = ({
    onClose,
    color
}: StartHuddleModalScreenProps): JSX.Element => {
    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const what = useRef<string>();

    const addHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            sender: username,
            name: firstname,
            what: what?.current,
            color
        }).subscribe();
    }, [color, firstname, onClose, username]);

    const onPressAddCard = useCallback(() => {
        if (what?.current) {
            addHuddle();
        } else {
            Alert.alert('Please add what would you like to do to start Huddle');
        }
    }, [addHuddle]);

    return (
        <View style={StartHuddleModalScreenStyle.screen}>
            <Text style={StartHuddleModalScreenStyle.huddleText}>Huddle</Text>
            <HuddleEditableCard
                onWhatChange={(text) => {
                    what.current = text;
                }}
                color={color}
            />
            <TouchableOpacity
                onPress={onPressAddCard}
                style={StartHuddleModalScreenStyle.addButtonView}
            >
                <Text style={StartHuddleModalScreenStyle.addButtonText}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    );
};
