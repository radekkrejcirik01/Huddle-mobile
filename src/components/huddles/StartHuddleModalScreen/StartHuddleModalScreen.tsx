import React, { useCallback, useRef, useState } from 'react';
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
    onCreate,
    onClose
}: StartHuddleModalScreenProps): JSX.Element => {
    const { firstname } = useSelector((state: ReducerProps) => state.user.user);

    const [selectedColor, setSelectedColor] = useState<number>(0);

    const topic = useRef<string>();

    const addHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            name: firstname,
            topic: topic?.current,
            color: selectedColor
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                onCreate();
            }
        });
    }, [firstname, onClose, onCreate, selectedColor]);

    const onPressAddCard = useCallback(() => {
        if (topic?.current) {
            addHuddle();
        } else {
            Alert.alert('Please add what would you like to do to start Huddle');
        }
    }, [addHuddle]);

    return (
        <View style={StartHuddleModalScreenStyle.screen}>
            <Text style={StartHuddleModalScreenStyle.huddleText}>Huddle</Text>
            <HuddleEditableCard
                onTopicChange={(text) => {
                    topic.current = text;
                }}
                color={selectedColor}
            />
            <View style={StartHuddleModalScreenStyle.colorsView}>
                <TouchableOpacity
                    onPress={() => setSelectedColor(0)}
                    style={[
                        StartHuddleModalScreenStyle.colorView,
                        StartHuddleModalScreenStyle.redBackground,
                        selectedColor === 0 &&
                            StartHuddleModalScreenStyle.borderWidth
                    ]}
                />
                <TouchableOpacity
                    onPress={() => setSelectedColor(1)}
                    style={[
                        StartHuddleModalScreenStyle.colorView,
                        StartHuddleModalScreenStyle.orangeBackground,
                        selectedColor === 1 &&
                            StartHuddleModalScreenStyle.borderWidth
                    ]}
                />
                <TouchableOpacity
                    onPress={() => setSelectedColor(2)}
                    style={[
                        StartHuddleModalScreenStyle.colorView,
                        StartHuddleModalScreenStyle.blueBackground,
                        selectedColor === 2 &&
                            StartHuddleModalScreenStyle.borderWidth
                    ]}
                />
                <TouchableOpacity
                    onPress={() => setSelectedColor(3)}
                    style={[
                        StartHuddleModalScreenStyle.colorView,
                        StartHuddleModalScreenStyle.purpleBackground,
                        selectedColor === 3 &&
                            StartHuddleModalScreenStyle.borderWidth
                    ]}
                />
            </View>
            <TouchableOpacity
                onPress={onPressAddCard}
                style={StartHuddleModalScreenStyle.addButtonView}
            >
                <Text style={StartHuddleModalScreenStyle.addButtonText}>
                    Create
                </Text>
            </TouchableOpacity>
        </View>
    );
};
