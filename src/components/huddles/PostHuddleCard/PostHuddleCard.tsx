import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    HuddleEditableCardDefaultProps,
    PostHuddleCardProps
} from '@components/huddles/PostHuddleCard/PostHuddleCard.props';
import { PostHuddleCardStyle } from '@components/huddles/PostHuddleCard/PostHuddleCard.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';

export const PostHuddleCard = ({
    messageValue,
    onMessageChange,
    onSend,
    style
}: PostHuddleCardProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    return (
        <View style={[PostHuddleCardStyle.container, style]}>
            <View style={PostHuddleCardStyle.row}>
                <ProfilePhoto
                    name={firstname}
                    photo={profilePhoto}
                    size={40}
                    textBackgroundColor={COLORS.BLACK_100}
                />
                <View style={PostHuddleCardStyle.titleView}>
                    <Text style={PostHuddleCardStyle.titleText}>
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
                style={PostHuddleCardStyle.input}
            />
            <TouchableOpacity
                onPress={onSend}
                style={PostHuddleCardStyle.sendView}
            >
                <Icon name={IconEnum.SEND} size={32} />
            </TouchableOpacity>
        </View>
    );
};

PostHuddleCard.defaultProps = HuddleEditableCardDefaultProps;
