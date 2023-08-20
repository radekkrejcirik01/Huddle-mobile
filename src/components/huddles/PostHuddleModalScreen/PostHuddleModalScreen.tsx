import React, { useCallback, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { PostHuddleModalScreenStyle } from '@components/huddles/PostHuddleModalScreen/PostHuddleModalScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddHuddlePostInterface } from '@interfaces/post/Post.inteface';
import { PostHuddleModalScreenProps } from '@components/huddles/PostHuddleModalScreen/PostHuddleModalScreen.props';
import { PostHuddleCard } from '@components/huddles/PostHuddleCard/PostHuddleCard';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';

export const PostHuddleModalScreen = ({
    onCreate,
    onClose
}: PostHuddleModalScreenProps): JSX.Element => {
    const { firstname } = useSelector((state: ReducerProps) => state.user.user);

    const route = useRoute();

    const message = useRef<string>();
    const photo = useRef<string>();

    const isChatsTab = route?.name === BottomTabNavigatorEnum.ChatsTab;

    const postHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            name: firstname,
            message: message?.current,
            photo: photo?.current
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                onCreate();

                if (isChatsTab) Alert.alert('Posted 🐨');
            }
        });
    }, [firstname, isChatsTab, onClose, onCreate]);

    return (
        <View style={PostHuddleModalScreenStyle.screen}>
            <Text style={PostHuddleModalScreenStyle.title}>
                {`What's on your mind?`}
            </Text>
            <PostHuddleCard
                onMessageChange={(text) => {
                    message.current = text;
                }}
                onPhotoChoose={(value) => {
                    photo.current = value;
                }}
                onPhotoRemove={() => {
                    photo.current = null;
                }}
                onSend={postHuddle}
            />
            <Text style={PostHuddleModalScreenStyle.description}>
                Leaf will be posted ín chats
            </Text>
        </View>
    );
};
