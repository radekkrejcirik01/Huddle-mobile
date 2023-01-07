import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PeopleScreenStyle } from '@screens/people/PeopleScreen/PeopleScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';

export const PeopleScreen = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>();

    const onInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <SafeAreaView style={PeopleScreenStyle.safeArea}>
            <View style={PeopleScreenStyle.container}>
                <Text style={PeopleScreenStyle.title}>PingMe</Text>
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
