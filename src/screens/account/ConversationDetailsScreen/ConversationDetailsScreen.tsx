import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import COLORS from '@constants/COLORS';
import { ConversationDetailsScreenProps } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';
import { getRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseIsConversationMutedGetInterface
} from '@interfaces/response/Response.interface';
import {
    BlockUserPostInterface,
    ConversationNotificationsPostInterface
} from '@interfaces/post/Post.inteface';
import { ConversationDetailsScreenStyle } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ConversationDetailsScreen = ({
    route
}: ConversationDetailsScreenProps): JSX.Element => {
    const { conversationId, name, profilePhoto } = route.params;

    const navigation = useNavigation();
    const openProfile = useOpenProfilePhoto();

    const [muted, setMuted] = useState<boolean>(false);
    const [people, setPeople] = useState<Array<string>>([]);

    const loadIsConversationMuted = useCallback(() => {
        getRequestUser<ResponseIsConversationMutedGetInterface>(
            `muted-conversation/${conversationId}`
        ).subscribe((response: ResponseIsConversationMutedGetInterface) => {
            if (response?.status) {
                setMuted(response?.muted);
                setPeople(response?.people);
            }
        });
    }, [conversationId]);

    useEffect(() => loadIsConversationMuted(), [loadIsConversationMuted]);

    useEffect(() => {
        navigation.setOptions({
            title: (
                <Text style={ConversationDetailsScreenStyle.headerTitle}>
                    {name}
                </Text>
            )
        });
    }, [name, navigation]);

    const updateNotifications = useCallback(
        (value: boolean) => {
            setMuted(value);
            postRequestUser<
                ResponseInterface,
                ConversationNotificationsPostInterface
            >('mute-conversation', {
                conversationId
            }).subscribe();
        },
        [conversationId]
    );

    const blockUser = useCallback(() => {
        if (people?.length) {
            postRequestUser<ResponseInterface, BlockUserPostInterface>(
                'block-user',
                {
                    blocked: people[0]
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    navigation.goBack();
                    navigation.goBack();
                }
            });
        }
    }, [navigation, people]);

    const blockUserPress = useCallback(
        () =>
            Alert.alert(
                'Are you sure you want to block this user?',
                `User won't be able to reach you and the chat will be deleted`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: blockUser,
                        style: 'destructive'
                    }
                ]
            ),
        [blockUser]
    );

    return (
        <ScrollView style={ConversationDetailsScreenStyle.container}>
            <View style={ConversationDetailsScreenStyle.box}>
                <TouchableOpacity
                    hitSlop={{}}
                    style={ConversationDetailsScreenStyle.view}
                >
                    <View style={ConversationDetailsScreenStyle.titleView}>
                        <Text style={ConversationDetailsScreenStyle.titleEmoji}>
                            📲
                        </Text>
                        <Text style={ConversationDetailsScreenStyle.titleText}>
                            Mute messages
                        </Text>
                    </View>
                    <Switch
                        value={muted}
                        onValueChange={updateNotifications}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={ConversationDetailsScreenStyle.switch}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{}}
                    onPress={blockUserPress}
                    style={ConversationDetailsScreenStyle.view}
                >
                    <View style={ConversationDetailsScreenStyle.titleView}>
                        <Text style={ConversationDetailsScreenStyle.titleEmoji}>
                            🚫
                        </Text>
                        <Text style={ConversationDetailsScreenStyle.titleText}>
                            Block user
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={ConversationDetailsScreenStyle.box}>
                <TouchableOpacity
                    hitSlop={{}}
                    onPress={() => openProfile(name, profilePhoto)}
                    style={ConversationDetailsScreenStyle.view}
                >
                    <View style={ConversationDetailsScreenStyle.titleView}>
                        <ProfilePhoto
                            name={name}
                            photo={profilePhoto}
                            size={25}
                        />
                        <Text style={ConversationDetailsScreenStyle.titleText}>
                            Profile photo
                        </Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={ConversationDetailsScreenStyle.icon}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
