import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ConversationHeaderProps } from '@components/conversation/ConversationHeader/ConversationHeader.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ConversationHeaderStyle } from '@components/conversation/ConversationHeader/ConversationHeader.style';

export const ConversationHeader = ({
    name,
    profilePhoto
}: ConversationHeaderProps): JSX.Element => {
    const navigation = useDefaultNavigation();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={ConversationHeaderStyle.container}>
            <IconButton
                icon={IconEnum.BACK}
                size={20}
                onPress={() => navigation.goBack()}
            />
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
                style={ConversationHeaderStyle.view}
            >
                <FastImage
                    source={{ uri: profilePhoto }}
                    style={ConversationHeaderStyle.image}
                />
                <Text style={ConversationHeaderStyle.name}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
};
