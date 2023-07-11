import React from 'react';
import { Text, View } from 'react-native';
import { AddHuddle } from '@components/huddles/AddHuddle/AddHuddle';
import { HuddlesHeaderStyle } from '@components/huddles/HuddlesHeader/HuddlesHeader.style';
import { HuddlesHeaderProps } from '@components/huddles/HuddlesHeader/HuddlesHeader.props';

export const HuddlesHeader = ({
    onHuddleCreate
}: HuddlesHeaderProps): JSX.Element => (
    <View style={HuddlesHeaderStyle.view}>
        <AddHuddle onCreateHuddle={onHuddleCreate} />
        <Text style={HuddlesHeaderStyle.titleText}>huddles</Text>
    </View>
);
