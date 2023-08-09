import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHuddleActions } from '@hooks/useHuddleActions';
import { useRenderComments } from '@hooks/useRenderComments';
import { LargeHuddleItem } from '@components/huddles/LargeHuddleItem/LargeHuddleItem';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddleGetInterface,
    ResponseHuddlesCommentsGetInterface
} from '@interfaces/response/Response.interface';
import { HuddleScreenProps } from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleScreenStyle } from '@screens/account/HuddleScreen/HuddleScreen.style';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { CommentItemInterface } from '@components/huddles/CommentItem/CommentItem.props';
import { CommentInput } from '@components/huddles/CommentInput/CommentInput';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export const HuddleScreen = ({ route }: HuddleScreenProps): JSX.Element => {
    const { huddleId } = route.params;
    const { bottom } = useSafeAreaInsets();

    const [huddle, setHuddle] = useState<HuddleItemInterface>();
    const [comments, setComments] = useState<Array<CommentItemInterface>>([]);
    const [mention, setMention] = useState<Mention>(null);
    const [mentions, setMentions] = useState<Array<Mention>>([]);

    const commentsListRef = useRef(null);

    const loadHuddle = useCallback(() => {
        getRequestUser<ResponseHuddleGetInterface>(
            `huddle/${huddleId}`
        ).subscribe((response: ResponseHuddleGetInterface) => {
            if (response?.status) {
                setHuddle(response.data);
            }
        });
    }, [huddleId]);

    const { openHuddleActions, onHuddleLikePress, openHuddleProfile } =
        useHuddleActions(loadHuddle);

    const loadComments = useCallback(
        (lastId?: number) => {
            let endpoint = `comments/${huddleId}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseHuddlesCommentsGetInterface>(
                endpoint
            ).subscribe((response: ResponseHuddlesCommentsGetInterface) => {
                if (response?.status) {
                    setMentions(response?.mentions);

                    if (!lastId) {
                        setComments(response?.data);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setComments((value) => value.concat(response?.data));
                    }
                }
            });
        },
        [huddleId]
    );

    useEffect(() => {
        loadHuddle();
        loadComments();
    }, [loadComments, loadHuddle]);

    const {
        renderCommentItem,
        keyCommentExtractor,
        refreshControl,
        onEndReached
    } = useRenderComments(
        comments,
        huddleId,
        loadHuddle,
        loadComments,
        setMention
    );

    const onSendComment = useCallback(() => {
        loadComments();
        loadHuddle();
        commentsListRef.current?.scrollToIndex({
            index: comments?.length - 1,
            animated: true
        });
    }, [comments?.length, loadComments, loadHuddle]);

    return (
        <View
            style={[
                HuddleScreenStyle.container,
                { paddingBottom: bottom - 15 }
            ]}
        >
            <FlashList
                ref={commentsListRef}
                ListHeaderComponent={
                    <>
                        <View style={HuddleScreenStyle.margin}>
                            <LargeHuddleItem
                                item={huddle}
                                onProfilePress={() => openHuddleProfile(huddle)}
                                onLikePress={() => onHuddleLikePress(huddle)}
                                onMorePress={() => openHuddleActions(huddle)}
                                style={HuddleScreenStyle.huddleListItem}
                            />
                        </View>
                        <Text style={HuddleScreenStyle.title}>Comments 💬</Text>
                    </>
                }
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={keyCommentExtractor}
                estimatedItemSize={68}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                ItemSeparatorComponent={() => <ItemSeparator space={30} />}
                contentContainerStyle={HuddleScreenStyle.listContentContainer}
            />
            <KeyboardAvoidingView keyboardVerticalOffset={42}>
                <CommentInput
                    huddleId={huddle?.id}
                    onSend={onSendComment}
                    mention={mention}
                    mentions={mentions}
                />
            </KeyboardAvoidingView>
        </View>
    );
};
