import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { PersonAccountScreenProps } from '@screens/account/PersonAccountScreen/PersonAccountScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const PersonAccountScreen = ({
    route
}: PersonAccountScreenProps): JSX.Element => {
    const { name, username, profilePicture } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: username });
    }, [navigation, username]);

    const onRequest = () => {
        Alert.alert('Pressed');
    };

    return (
        <View style={PersonAccountScreenStyle.container}>
            <View>
                <FastImage
                    source={{ uri: profilePicture }}
                    style={PersonAccountScreenStyle.image}
                />
                <Text style={PersonAccountScreenStyle.name}>{name}</Text>
            </View>
            <TouchableOpacity
                onPress={onRequest}
                style={PersonAccountScreenStyle.hangoutTouchableOpacity}
            >
                <Text style={PersonAccountScreenStyle.hangoutText}>
                    Send hangout
                </Text>
            </TouchableOpacity>
        </View>
    );
};
