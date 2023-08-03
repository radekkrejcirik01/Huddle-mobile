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

export const StartHuddleModalScreen = ({
    onCreate,
    onClose
}: StartHuddleModalScreenProps): JSX.Element => {
    const { firstname } = useSelector((state: ReducerProps) => state.user.user);

    const message = useRef<string>();

    const addHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            name: firstname,
            message: message?.current
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                onCreate();
                Alert.alert('✅');
            }
        });
    }, [firstname, onClose, onCreate]);

    const onPressAddCard = useCallback(() => {
        if (message?.current?.length) {
            addHuddle();
        } else {
            Alert.alert('Huddle is empty');
        }
    }, [addHuddle]);

    return (
        <View style={StartHuddleModalScreenStyle.screen}>
            <>
                <Text style={StartHuddleModalScreenStyle.title}>
                    New Huddle 🥳
                </Text>
                <HuddleEditableCard
                    onMessageChange={(text) => {
                        message.current = text;
                    }}
                    onSend={onPressAddCard}
                />
                <Text style={StartHuddleModalScreenStyle.description}>
                    Huddle will be shared across all chats
                </Text>
            </>
        </View>
    );
};
