import React from 'react';
import { View } from 'react-native';
import { ItemSeparatorProps } from '@components/general/ItemSeparator/ItemSeparator.props';

export const ItemSeparator = ({ space }: ItemSeparatorProps): JSX.Element => (
    <View style={{ height: space }} />
);
