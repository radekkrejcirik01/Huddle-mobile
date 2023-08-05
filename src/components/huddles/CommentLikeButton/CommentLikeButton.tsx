import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { CommentLikeButtonProps } from '@components/huddles/CommentLikeButton/CommentLikeButton.props';
import { CommentLikeButtonStyle } from '@components/huddles/CommentLikeButton/CommentLikeButton.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const CommentLikeButton = ({
    value,
    onPressLike
}: CommentLikeButtonProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(!!value);

    const like = useCallback(() => {
        setLiked(!liked);

        onPressLike(!liked);
    }, [liked, onPressLike]);

    return (
        <TouchableOpacity onPress={like} style={CommentLikeButtonStyle.view}>
            {liked ? (
                <Text style={CommentLikeButtonStyle.heartText}>🧡</Text>
            ) : (
                <Icon name={IconEnum.HEART} size={18} />
            )}
        </TouchableOpacity>
    );
};
