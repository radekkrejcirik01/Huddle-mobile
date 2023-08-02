import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ConversationLikeProps } from '@components/conversation/ConversationLike/ConversationLike.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ConversationLikeStyle } from '@components/conversation/ConversationLike/ConversationLike.style';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseConversationLikedInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ConversationLikePostInterface } from '@interfaces/post/Post.inteface';

export const ConversationLike = ({
    conversationId
}: ConversationLikeProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(null);

    useEffect(() => {
        getRequestUser<ResponseConversationLikedInterface>(
            `conversation-like/${conversationId}`
        ).subscribe((response: ResponseConversationLikedInterface) => {
            if (response?.status) {
                setLiked(response?.isLiked === 1);
            }
        });
    }, [conversationId]);

    const like = useCallback(() => {
        setLiked(true);

        postRequestUser<ResponseInterface, ConversationLikePostInterface>(
            'conversation-like',
            {
                conversationId
            }
        ).subscribe();
    }, [conversationId]);

    const unLike = useCallback(() => {
        setLiked(false);

        deleteRequestUser<ResponseInterface>(
            `conversation-like/${conversationId}`
        ).subscribe();
    }, [conversationId]);

    if (liked === null) {
        return null;
    }

    return liked ? (
        <TouchableOpacity
            onPress={unLike}
            style={ConversationLikeStyle.heartView}
        >
            <Text style={ConversationLikeStyle.heartText}>❤️</Text>
        </TouchableOpacity>
    ) : (
        <IconButton
            icon={IconEnum.HEART}
            onPress={like}
            size={23}
            style={ConversationLikeStyle.heartIcon}
        />
    );
};
