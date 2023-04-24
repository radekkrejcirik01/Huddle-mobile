import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { HuddlesTabHeaderProps } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.props';

export const HuddlesTabHeader = ({
    onPressPlus
}: HuddlesTabHeaderProps): JSX.Element => (
    <SafeAreaView>
        <View style={HuddlesTabHeaderStyle.header}>
            <Text style={HuddlesTabHeaderStyle.content}>Huddles</Text>
            <IconButton
                icon={IconEnum.PLUS}
                onPress={onPressPlus}
                size={25}
                style={HuddlesTabHeaderStyle.iconButton}
            />
        </View>
    </SafeAreaView>
);
