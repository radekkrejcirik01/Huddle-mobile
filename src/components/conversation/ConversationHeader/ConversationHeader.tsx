import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTypingIndicator } from '@hooks/useTypingIndicator';
import { useNavigation } from '@hooks/useNavigation';
import { ConversationHeaderProps } from '@components/conversation/ConversationHeader/ConversationHeader.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ConversationHeaderStyle } from '@components/conversation/ConversationHeader/ConversationHeader.style';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { Back } from '@components/general/Back/Back';

export const ConversationHeader = ({
    conversationId,
    name,
    profilePhoto
}: ConversationHeaderProps): JSX.Element => {
    const { isTyping } = useTypingIndicator(conversationId);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openConversationDetails = useCallback(
        () =>
            navigateTo(AccountStackNavigatorEnum.ConversationDetailsScreen, {
                conversationId,
                name,
                profilePhoto
            }),
        [conversationId, name, navigateTo, profilePhoto]
    );

    return (
        <View style={ConversationHeaderStyle.container}>
            <Back />
            <TouchableOpacity
                onPress={openConversationDetails}
                style={ConversationHeaderStyle.detailsView}
            >
                <ProfilePhoto name={name} photo={profilePhoto} size={38} />
                <View style={ConversationHeaderStyle.textsView}>
                    <Text style={ConversationHeaderStyle.nameText}>{name}</Text>
                    <Text style={ConversationHeaderStyle.tapHereText}>
                        {isTyping ? 'is typing...' : 'tap here for details'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
