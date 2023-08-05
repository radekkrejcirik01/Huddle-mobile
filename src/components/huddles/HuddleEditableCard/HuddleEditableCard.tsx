import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    HuddleEditableCardDefaultProps,
    HuddleEditableCardProps
} from '@components/huddles/HuddleEditableCard/HuddleEditableCard.props';
import { HuddleEditableCardStyle } from '@components/huddles/HuddleEditableCard/HuddleEditableCard.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';

export const HuddleEditableCard = ({
    messageValue,
    onMessageChange,
    onSend,
    style
}: HuddleEditableCardProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    return (
        <View style={[HuddleEditableCardStyle.container, style]}>
            <View style={HuddleEditableCardStyle.row}>
                <ProfilePhoto
                    name={firstname}
                    photo={profilePhoto}
                    size={40}
                    textBackgroundColor={COLORS.BLACK_100}
                />
                <View style={HuddleEditableCardStyle.titleView}>
                    <Text style={HuddleEditableCardStyle.titleText}>
                        {firstname}
                    </Text>
                </View>
            </View>
            <TextInput
                autoFocus
                autoCorrect={false}
                defaultValue={messageValue}
                onChangeText={onMessageChange}
                selectionColor={COLORS.WHITE}
                multiline
                style={HuddleEditableCardStyle.input}
            />
            <TouchableOpacity
                onPress={onSend}
                style={HuddleEditableCardStyle.sendView}
            >
                <Icon name={IconEnum.SEND} size={32} />
            </TouchableOpacity>
        </View>
    );
};

HuddleEditableCard.defaultProps = HuddleEditableCardDefaultProps;
