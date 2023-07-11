import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { ConversationHeaderProps } from '@components/conversation/ConversationHeader/ConversationHeader.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ConversationHeaderStyle } from '@components/conversation/ConversationHeader/ConversationHeader.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ConversationHeader = ({
    conversationId,
    name,
    profilePhoto
}: ConversationHeaderProps): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            onPress={() =>
                navigateTo(
                    AccountStackNavigatorEnum.ConversationDetailsScreen,
                    {
                        conversationId,
                        name,
                        profilePhoto
                    }
                )
            }
            style={ConversationHeaderStyle.container}
        >
            <ProfilePhoto name={name} photo={profilePhoto} size={40} />
            <Text style={ConversationHeaderStyle.nameText}>{name}</Text>
        </TouchableOpacity>
    );
};
