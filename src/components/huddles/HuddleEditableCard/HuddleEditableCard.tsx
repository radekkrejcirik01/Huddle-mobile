import React from 'react';
import { TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    HuddleEditableCardDefaultProps,
    HuddleEditableCardProps
} from '@components/huddles/HuddleEditableCard/HuddleEditableCard.props';
import { HuddleEditableCardStyle } from '@components/huddles/HuddleEditableCard/HuddleEditableCard.style';

export const HuddleEditableCard = ({
    whatValue,
    onWhatChange,
    whereValue,
    onWhereChange,
    whenValue,
    onWhenChange,
    style
}: HuddleEditableCardProps): JSX.Element => {
    const { profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    return (
        <View style={[HuddleEditableCardStyle.container, style]}>
            <View style={HuddleEditableCardStyle.inputsContainer}>
                <TextInput
                    autoFocus
                    placeholder="What"
                    autoCorrect={false}
                    defaultValue={whatValue}
                    onChangeText={onWhatChange}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={HuddleEditableCardStyle.primaryInput}
                />
                <TextInput
                    placeholder="Anywhere"
                    autoCorrect={false}
                    defaultValue={whereValue}
                    onChangeText={onWhereChange}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={HuddleEditableCardStyle.secondaryInput}
                />
                <TextInput
                    placeholder="Anytime"
                    autoCapitalize="none"
                    autoCorrect={false}
                    defaultValue={whenValue}
                    onChangeText={onWhenChange}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={HuddleEditableCardStyle.secondaryInput}
                />
            </View>
            <FastImage
                source={{ uri: profilePhoto }}
                style={HuddleEditableCardStyle.image}
            />
        </View>
    );
};

HuddleEditableCard.defaultProps = HuddleEditableCardDefaultProps;