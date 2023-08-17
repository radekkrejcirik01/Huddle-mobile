import React from 'react';
import { Text, View } from 'react-native';
import { useModal } from '@hooks/useModal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { CommentItemProps } from '@components/huddles/CommentItem/CommentItem.props';
import { CommentsItemStyle } from '@components/huddles/CommentItem/CommentsItem.style';
import { CommentLikeButton } from '@components/huddles/CommentLikeButton/CommentLikeButton';
import { Modal } from '@components/general/Modal/Modal';
import { CommentLikesModal } from '@components/huddles/CommentLikesModal/CommentLikesModal';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const CommentsItem = ({
    item,
    onPressProfilePhoto,
    onPressName,
    onPressMention,
    onItemLongPress,
    liked,
    onPressLike
}: CommentItemProps): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    return (
        <TouchableOpacity
            activeOpacity={1}
            onLongPress={onItemLongPress}
            style={CommentsItemStyle.container}
        >
            <View style={CommentsItemStyle.content}>
                <TouchableOpacity
                    onPress={onPressProfilePhoto}
                    style={CommentsItemStyle.imageView}
                >
                    <ProfilePhoto
                        name={item.name}
                        photo={item?.profilePhoto}
                        size={40}
                    />
                </TouchableOpacity>
                <View style={CommentsItemStyle.textsContainer}>
                    <View style={CommentsItemStyle.row}>
                        <TouchableOpacity
                            onPress={onPressName}
                            style={CommentsItemStyle.nameView}
                        >
                            <Text style={CommentsItemStyle.nameText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={CommentsItemStyle.timeText}>
                            {getLocalTimeFromUTCUnix(item.time).fromNow()}
                        </Text>
                        {!!item?.mention && (
                            <TouchableOpacity
                                onPress={onPressMention}
                                style={CommentsItemStyle.mentionView}
                            >
                                <Text style={CommentsItemStyle.mentionText}>
                                    @{item?.mention.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={CommentsItemStyle.messageText}>
                        {item.message}
                    </Text>
                    {!!item?.likesNumber && (
                        <TouchableOpacity
                            onLongPress={showModal}
                            onPress={showModal}
                            style={CommentsItemStyle.likesView}
                        >
                            <Text style={CommentsItemStyle.likesText}>
                                {item?.likesNumber}{' '}
                                <Text style={CommentsItemStyle.heartText}>
                                    🧡
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <CommentLikeButton value={liked} onPressLike={onPressLike} />
            <Modal
                isVisible={modalVisible}
                content={
                    <CommentLikesModal id={item.id} hideModal={hideModal} />
                }
                backdropOpacity={0.2}
                onClose={hideModal}
                style={CommentsItemStyle.modal}
            />
        </TouchableOpacity>
    );
};
