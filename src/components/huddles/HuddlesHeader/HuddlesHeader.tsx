import React from 'react';
import { Text, View } from 'react-native';
import { PostHuddle } from '@components/huddles/PostHuddle/PostHuddle';
import { HuddlesHeaderStyle } from '@components/huddles/HuddlesHeader/HuddlesHeader.style';
import { HuddlesHeaderProps } from '@components/huddles/HuddlesHeader/HuddlesHeader.props';

export const HuddlesHeader = ({
    onHuddleCreate
}: HuddlesHeaderProps): JSX.Element => (
    <View style={HuddlesHeaderStyle.view}>
        <PostHuddle onCreateHuddle={onHuddleCreate} />
        <Text style={HuddlesHeaderStyle.titleText}>huddles</Text>
    </View>
);
