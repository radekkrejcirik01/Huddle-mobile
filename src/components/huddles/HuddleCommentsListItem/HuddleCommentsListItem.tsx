import React from 'react';
import { Text, View } from 'react-native';
import { useModal } from '@hooks/useModal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleCommentsListItemProps } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItemStyle } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.style';
import { LikeComponent } from '@components/huddles/LikeComponent/LikeComponent';
import { Modal } from '@components/general/Modal/Modal';
import { LikesModalContent } from '@components/huddles/LikesModalContent/LikesModalContent';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const HuddleCommentsListItem = ({
    item,
    onPressProfilePhoto,
    onPressName,
    onPressMention,
    onItemLongPress,
    liked,
    onPressLike
}: HuddleCommentsListItemProps): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    return (
        <TouchableOpacity
            activeOpacity={1}
            onLongPress={onItemLongPress}
            style={HuddleCommentsListItemStyle.container}
        >
            <View style={HuddleCommentsListItemStyle.content}>
                <TouchableOpacity
                    onPress={onPressProfilePhoto}
                    style={HuddleCommentsListItemStyle.imageView}
                >
                    <ProfilePhoto
                        name={item.name}
                        photo={item?.profilePhoto}
                        size={40}
                    />
                </TouchableOpacity>
                <View style={HuddleCommentsListItemStyle.textsContainer}>
                    <View style={HuddleCommentsListItemStyle.row}>
                        <TouchableOpacity
                            onPress={onPressName}
                            style={HuddleCommentsListItemStyle.nameView}
                        >
                            <Text style={HuddleCommentsListItemStyle.nameText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={HuddleCommentsListItemStyle.timeText}>
                            {getLocalTimeFromUTCUnix(item.time).fromNow()}
                        </Text>
                        {!!item?.mention && (
                            <TouchableOpacity
                                onPress={onPressMention}
                                style={HuddleCommentsListItemStyle.mentionView}
                            >
                                <Text
                                    style={
                                        HuddleCommentsListItemStyle.mentionText
                                    }
                                >
                                    @{item?.mention.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={HuddleCommentsListItemStyle.messageText}>
                        {item.message}
                    </Text>
                    {!!item?.likesNumber && (
                        <TouchableOpacity
                            onLongPress={showModal}
                            onPress={showModal}
                            style={HuddleCommentsListItemStyle.likesView}
                        >
                            <Text style={HuddleCommentsListItemStyle.likesText}>
                                {item?.likesNumber}{' '}
                                <Text
                                    style={
                                        HuddleCommentsListItemStyle.heartText
                                    }
                                >
                                    🧡
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <LikeComponent value={liked} onPressLike={onPressLike} />
            <Modal
                isVisible={modalVisible}
                content={
                    <LikesModalContent id={item.id} hideModal={hideModal} />
                }
                backdropOpacity={0.2}
                onClose={hideModal}
                style={HuddleCommentsListItemStyle.modal}
            />
        </TouchableOpacity>
    );
};
