import React, { useEffect, useMemo } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { EventScreenProps } from '@screens/account/EventScreen/EventScreen.props';
import { EventScreenStyle } from '@screens/account/EventScreen/EventScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const EventScreen = ({ route }: EventScreenProps): JSX.Element => {
    const { item } = route.params;

    useEffect(() => {
        Alert.alert(item.id.toString());
    }, [item.id]);

    const pictures = useMemo(
        (): JSX.Element => (
            <View style={EventScreenStyle.imageView}>
                <FastImage
                    style={EventScreenStyle.image}
                    source={{ uri: item.picture }}
                />
            </View>
        ),
        [item?.picture]
    );

    const onActionPress = () => {
        Alert.alert('Action');
    };

    const onSendMessagePress = () => {
        Alert.alert('Message');
    };

    return (
        <ScrollView contentContainerStyle={EventScreenStyle.contentContainer}>
            <View>
                <View style={EventScreenStyle.picturesView}>{pictures}</View>
                <Text style={EventScreenStyle.nameText}>{item.title}</Text>
                <Text style={EventScreenStyle.nameText}>{item.place}</Text>
                <Text
                    style={[
                        EventScreenStyle.nameText,
                        EventScreenStyle.timeText
                    ]}
                >
                    {item.time}
                </Text>
            </View>
            <View style={EventScreenStyle.buttonsRow}>
                <TouchableOpacity
                    onPress={onActionPress}
                    style={EventScreenStyle.row}
                >
                    <Text style={EventScreenStyle.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onSendMessagePress}
                    style={EventScreenStyle.row}
                >
                    <Text style={EventScreenStyle.buttonText}>Open chat</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
