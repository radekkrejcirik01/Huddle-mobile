import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { setGetStarted } from '@store/GetStartedReducer';
import { LoginScreenStyle } from '@screens/getStarted/GetStartedScreen/GetStartedScreen.style';

export const GetStartedScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    const getStarted = useCallback(() => {
        dispatch(setGetStarted(false));
        PersistStorage.setItem(
            PersistStorageKeys.GET_STARTED,
            'started'
        ).catch();
    }, [dispatch]);

    return (
        <View style={LoginScreenStyle.container}>
            <Text style={LoginScreenStyle.titleText}>
                Buongiorno! Ahoj! Hello! 🥰
            </Text>
            <Text
                style={[
                    LoginScreenStyle.descriptionText,
                    LoginScreenStyle.marginTop
                ]}
            >
                <Text style={{ color: COLORS.PASTEL_BLUE }}>Huddles</Text>
                <Text style={{ color: COLORS.WHITE }}> and </Text>
                <Text style={{ color: COLORS.PASTEL_RED }}>interests</Text>
            </Text>
            <Text style={LoginScreenStyle.descriptionText}>
                <Text style={{ color: COLORS.PASTEL_PURPLE }}>Superior</Text>{' '}
                <Text style={{ color: COLORS.PASTEL_ORANGE }}>
                    communication
                </Text>
            </Text>
            <TouchableOpacity
                onPress={getStarted}
                style={LoginScreenStyle.buttonView}
            >
                <Text style={LoginScreenStyle.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};
