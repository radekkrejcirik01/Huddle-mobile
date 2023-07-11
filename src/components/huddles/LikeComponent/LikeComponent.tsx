import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { LikeComponentProps } from '@components/huddles/LikeComponent/LikeComponent.props';
import { LikeComponentStyle } from '@components/huddles/LikeComponent/LikeComponent.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

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
            {liked ? (
                <Text style={LikeComponentStyle.heartText}>🧡</Text>
            ) : (
                <Icon name={IconEnum.HEART} size={18} />
            )}
        </TouchableOpacity>
    );
};
