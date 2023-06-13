import React from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { ConversationHeaderProps } from '@components/conversation/ConversationHeader/ConversationHeader.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ConversationHeaderStyle } from '@components/conversation/ConversationHeader/ConversationHeader.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const ConversationHeader = ({
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
                        name,
                        profilePhoto
                    }
                )
            }
            style={ConversationHeaderStyle.container}
        >
            <FastImage
                source={{ uri: profilePhoto }}
                style={ConversationHeaderStyle.image}
            />
            <Text style={ConversationHeaderStyle.nameText}>{name}</Text>
        </TouchableOpacity>
    );
};
