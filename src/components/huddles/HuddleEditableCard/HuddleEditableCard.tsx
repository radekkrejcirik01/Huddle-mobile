import React from 'react';
import { Text, TextInput, View } from 'react-native';
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
            <View style={HuddleEditableCardStyle.content}>
                <View style={HuddleEditableCardStyle.row}>
                    <ProfilePhoto
                        name={firstname}
                        photo={profilePhoto}
                        size={55}
                        textBackgroundColor={secondaryColor}
                    />
                    <View style={HuddleEditableCardStyle.titleView}>
                        <Text style={HuddleEditableCardStyle.titleText}>
                            {firstname}
                        </Text>
                        <TextInput
                            autoFocus
                            autoCorrect={false}
                            defaultValue={topicValue}
                            onChangeText={onTopicChange}
                            selectionColor={COLORS.WHITE}
                            multiline
                            style={HuddleEditableCardStyle.input}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

HuddleEditableCard.defaultProps = HuddleEditableCardDefaultProps;
