import React from 'react';
import { TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getHuddleColor } from '@hooks/getHuddleColor';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    HuddleEditableCardDefaultProps,
    HuddleEditableCardProps
} from '@components/huddles/HuddleEditableCard/HuddleEditableCard.props';
import { HuddleEditableCardStyle } from '@components/huddles/HuddleEditableCard/HuddleEditableCard.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const HuddleEditableCard = ({
    topicValue,
    onTopicChange,
    color,
    style
}: HuddleEditableCardProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
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
                    autoCorrect={false}
                    defaultValue={topicValue}
                    onChangeText={onTopicChange}
                    selectionColor={COLORS.BUTTON_BLUE}
                    placeholderTextColor={COLORS.WHITE}
                    multiline
                    style={[
                        HuddleEditableCardStyle.input,
                        { backgroundColor: secondaryColor }
                    ]}
                />
            </View>
            <ProfilePhoto
                name={firstname}
                photo={profilePhoto}
                size={60}
                textBackgroundColor={secondaryColor}
                style={{ marginTop: 5, marginRight: 5 }}
            />
        </View>
    );
};

HuddleEditableCard.defaultProps = HuddleEditableCardDefaultProps;
