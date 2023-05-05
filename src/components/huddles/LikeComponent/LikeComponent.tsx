import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { LikeComponentProps } from '@components/huddles/LikeComponent/LikeComponent.props';
import { LikeComponentStyle } from '@components/huddles/LikeComponent/LikeComponent.style';

export const LikeComponent = ({
    value,
    onPressLike
}: LikeComponentProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(!!value);

    const like = useCallback(() => {
        setLiked(!liked);

        onPressLike(!liked);
    }, [liked, onPressLike]);

    return (
        <TouchableOpacity onPress={like} style={LikeComponentStyle.view}>
            <Text>{liked ? '🧡' : '🤍'}</Text>
        </TouchableOpacity>
    );
};
