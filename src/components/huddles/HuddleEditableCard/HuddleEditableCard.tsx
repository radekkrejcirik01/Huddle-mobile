import React from 'react';
import { TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { getHuddleColor } from '@hooks/getHuddleColor';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    HuddleEditableCardDefaultProps,
    HuddleEditableCardProps
} from '@components/huddles/HuddleEditableCard/HuddleEditableCard.props';
import { HuddleEditableCardStyle } from '@components/huddles/HuddleEditableCard/HuddleEditableCard.style';

export const HuddleEditableCard = ({
    topicValue,
    onTopicChange,
    color,
    style
}: HuddleEditableCardProps): JSX.Element => {
    const { profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { primaryColor, secondaryColor } = getHuddleColor(color);

    return (
        <View
            style={[
                HuddleEditableCardStyle.container,
                { backgroundColor: primaryColor },
                style
            ]}
        >
            <View style={HuddleEditableCardStyle.inputsContainer}>
                <TextInput
                    autoFocus
                    placeholder="topic"
                    autoCorrect={false}
                    defaultValue={topicValue}
                    onChangeText={onTopicChange}
                    selectionColor={COLORS.BUTTON_BLUE}
                    placeholderTextColor={COLORS.WHITE}
                    style={[
                        HuddleEditableCardStyle.primaryInput,
                        { backgroundColor: secondaryColor }
                    ]}
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
