import React, { useCallback, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PostHuddleModalScreenStyle } from '@components/huddles/PostHuddleModalScreen/PostHuddleModalScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddHuddlePostInterface } from '@interfaces/post/Post.inteface';
import { PostHuddleModalScreenProps } from '@components/huddles/PostHuddleModalScreen/PostHuddleModalScreen.props';
import { PostHuddleCard } from '@components/huddles/PostHuddleCard/PostHuddleCard';

export const PostHuddleModalScreen = ({
    onCreate,
    onClose
}: PostHuddleModalScreenProps): JSX.Element => {
    const { firstname } = useSelector((state: ReducerProps) => state.user.user);

    const message = useRef<string>();
    const photos = useRef<Array<string>>([]);

    const postHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            name: firstname,
            message: message?.current,
            photos: photos?.current
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                onCreate();
                Alert.alert('Posted ✅');
            }
        });
    }, [firstname, onClose, onCreate]);

    return (
        <View style={PostHuddleModalScreenStyle.screen}>
            <>
                <Text style={PostHuddleModalScreenStyle.title}>
                    {`What's on your mind?`}
                </Text>
                <PostHuddleCard
                    onMessageChange={(text) => {
                        message.current = text;
                    }}
                    onPhotoChoose={(value) => {
                        photos.current.push(value);
                    }}
                    onPhotoRemove={(index) => {
                        photos.current = photos.current.filter(
                            (value, i) => i !== index
                        );
                    }}
                    onSend={postHuddle}
                />
                <Text style={PostHuddleModalScreenStyle.description}>
                    Huddle will be posted across all chats
                </Text>
            </>
        </View>
    );
};
