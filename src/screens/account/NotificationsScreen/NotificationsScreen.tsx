import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { ConversationDetailsScreenStyle } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import COLORS from '@constants/COLORS';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseUserNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import { UserNotificationPutInterface } from '@interfaces/post/Post.inteface';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export const NotificationsScreen = (): JSX.Element => {
    const [friendsInvites, setFriendsInvites] = useState<boolean>(true);
    const [newHuddles, setNewHuddles] = useState<boolean>(true);
    const [huddleLikes, setHuddleLikes] = useState<boolean>(true);
    const [comments, setComments] = useState<boolean>(true);
    const [mentions, setMentions] = useState<boolean>(true);
    const [messages, setMessages] = useState<boolean>(true);

    useEffect(() => {
        getRequestUser<ResponseUserNotificationsGetInterface>(
            'notifications'
        ).subscribe((response: ResponseUserNotificationsGetInterface) => {
            if (response?.status) {
                setFriendsInvites(!!response?.data.friendsInvitesNotifications);
                setNewHuddles(!!response?.data.newHuddlesNotifications);
                setHuddleLikes(!!response?.data.huddleLikesNotifications);
                setComments(!!response?.data.commentsNotifications);
                setMentions(!!response?.data.mentionsNotifications);
                setMessages(!!response?.data.messagesNotifications);
            }
        });
    }, []);

    const update = (type: NotificationTypeEnum, value: number) =>
        putRequestUser<ResponseInterface, UserNotificationPutInterface>(
            'notification',
            {
                notification: type,
                value
            }
        ).subscribe();

    const switchFriendsInvites = useCallback(() => {
        setFriendsInvites(!friendsInvites);

        update(
            NotificationTypeEnum.FRIENDS_INVITES_NOTIFICATIONS,
            friendsInvites ? 0 : 1
        );
    }, [friendsInvites]);

    const switchNewHuddles = useCallback(() => {
        setNewHuddles(!newHuddles);

        update(
            NotificationTypeEnum.NEW_HUDDLES_NOTIFICATION,
            newHuddles ? 0 : 1
        );
    }, [newHuddles]);

    const switchHuddleLikes = useCallback(() => {
        setHuddleLikes(!huddleLikes);

        update(
            NotificationTypeEnum.HUDDLE_LIKES_NOTIFICATIONS,
            huddleLikes ? 0 : 1
        );
    }, [huddleLikes]);

    const switchComments = useCallback(() => {
        setComments(!comments);

        update(NotificationTypeEnum.COMMENTS_NOTIFICATIONS, comments ? 0 : 1);
    }, [comments]);

    const switchMentions = useCallback(() => {
        setMentions(!mentions);

        update(NotificationTypeEnum.MENTIONS_NOTIFICATIONS, mentions ? 0 : 1);
    }, [mentions]);

    const switchMessages = useCallback(() => {
        setMessages(!messages);

        update(NotificationTypeEnum.MESSAGES_NOTIFICATIONS, messages ? 0 : 1);
    }, [messages]);

    return (
        <ScrollView style={NotificationsScreenStyle.container}>
            <View style={NotificationsScreenStyle.box}>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            Friends invites
                        </Text>
                    </View>
                    <Switch
                        value={friendsInvites}
                        onValueChange={switchFriendsInvites}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={NotificationsScreenStyle.switch}
                    />
                </TouchableOpacity>
            </View>
            <View style={NotificationsScreenStyle.box}>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            New Huddles
                        </Text>
                    </View>
                    <Switch
                        value={newHuddles}
                        onValueChange={switchNewHuddles}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={ConversationDetailsScreenStyle.switch}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            Huddle Likes
                        </Text>
                    </View>
                    <Switch
                        value={huddleLikes}
                        onValueChange={switchHuddleLikes}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={NotificationsScreenStyle.switch}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            Comments
                        </Text>
                    </View>
                    <Switch
                        value={comments}
                        onValueChange={switchComments}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={NotificationsScreenStyle.switch}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            Mentions
                        </Text>
                    </View>
                    <Switch
                        value={mentions}
                        onValueChange={switchMentions}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={NotificationsScreenStyle.switch}
                    />
                </TouchableOpacity>
            </View>
            <View style={NotificationsScreenStyle.box}>
                <TouchableOpacity
                    hitSlop={{}}
                    style={NotificationsScreenStyle.view}
                >
                    <View style={NotificationsScreenStyle.titleView}>
                        <Text style={NotificationsScreenStyle.titleText}>
                            Messages
                        </Text>
                    </View>
                    <Switch
                        value={messages}
                        onValueChange={switchMessages}
                        trackColor={{
                            true: COLORS.BUTTON_BLUE
                        }}
                        style={NotificationsScreenStyle.switch}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
