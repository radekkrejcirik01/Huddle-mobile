import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PeopleScreenStyle } from '@screens/people/PeopleScreen/PeopleScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { IconEnum } from '@components/icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';

export const PeopleScreen = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>();

    const onInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <SafeAreaView style={PeopleScreenStyle.safeArea}>
            <View style={PeopleScreenStyle.container}>
                <View style={PeopleScreenStyle.header}>
                    <Text style={PeopleScreenStyle.title}>PingMe</Text>
                    <View style={PeopleScreenStyle.iconContainer}>
                        <IconButton
                            icon={IconEnum.BELL}
                            onPress={() => Alert.alert('notifications')}
                            size={25}
                            style={PeopleScreenStyle.bellIcon}
                        />
                        <IconButton
                            icon={IconEnum.CHAT_FILLED}
                            onPress={() => Alert.alert('messages')}
                            size={26}
                        />
                    </View>
                </View>
                <ScrollView style={PeopleScreenStyle.scrollView}>
                    <Input
                        iconLeft={<Text>🔍</Text>}
                        placeholder="Search for a friend..."
                        onChange={onInputChange}
                        inputType={InputTypeEnum.TEXT}
                        viewStyle={PeopleScreenStyle.inputView}
                        inputStyle={PeopleScreenStyle.input}
                        selectionColor={COLORS.MAIN_BLUE}
                        placeholderTextColor={COLORS.GRAY_800}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
