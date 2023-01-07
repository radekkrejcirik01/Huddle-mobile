import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { PersonAccountStyle } from '@screens/account/PersonAccountScreen/PersonAccount.style';
import { PersonAccountProps } from '@screens/account/PersonAccountScreen/PersonAccount.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const PersonAccountScreen = ({
    route
}: PersonAccountProps): JSX.Element => {
    const { name, username, profilePicture } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: username });
    }, [navigation, username]);

    const onRequest = () => {
        Alert.alert('Pressed');
    };

    return (
        <View style={PersonAccountStyle.container}>
            <View>
                <FastImage
                    source={{ uri: profilePicture }}
                    style={PersonAccountStyle.image}
                />
                <Text style={PersonAccountStyle.name}>{name}</Text>
            </View>
            <TouchableOpacity
                onPress={onRequest}
                style={PersonAccountStyle.hangoutTouchableOpacity}
            >
                <Text style={PersonAccountStyle.hangoutText}>Send hangout</Text>
            </TouchableOpacity>
        </View>
    );
};
