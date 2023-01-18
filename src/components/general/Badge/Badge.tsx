import React from 'react';
import { Text, View } from 'react-native';
import { BadgeProps } from '@components/general/Badge/Badge.props';
import { BadgeStyle } from '@components/general/Badge/Badge.style';

export const Badge = ({ value }: BadgeProps): JSX.Element =>
    value && (
        <View style={BadgeStyle.view}>
            <Text style={BadgeStyle.text}>{value}</Text>
        </View>
    );
