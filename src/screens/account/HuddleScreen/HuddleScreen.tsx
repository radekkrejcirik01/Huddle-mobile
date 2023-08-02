import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHuddleActions } from '@hooks/useHuddleActions';
import { useRenderComments } from '@hooks/useRenderComments';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesCommentsGetInterface,
    ResponseHuddlesGetInterface
} from '@interfaces/response/Response.interface';
import { HuddleScreenProps } from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleScreenStyle } from '@screens/account/HuddleScreen/HuddleScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { CommentInput } from '@components/huddles/CommentInput/CommentInput';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';

export const HuddleScreen = ({ route }: HuddleScreenProps): JSX.Element => {
    const { huddle, huddleId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();
    const { openHuddleActions, onHuddleLikePress, openHuddleProfile } =
        useHuddleActions();
    const { bottom } = useSafeAreaInsets();

    const [comments, setComments] = useState<Array<CommentItemInterface>>([]);
    const [mention, setMention] = useState<Mention>(null);
    const [mentions, setMentions] = useState<Array<Mention>>([]);

    const commentsListRef = useRef(null);

    useEffect(() => {
        if (!huddle && huddleId) {
            getRequestUser<ResponseHuddlesGetInterface>(
                `huddle/${huddleId}`
            ).subscribe((response: ResponseHuddlesGetInterface) => {
                if (response?.status) {
                    navigation.setParams({
                        huddle: response?.data
                    } as undefined);
                }
            });
        }
    }, [huddle, huddleId, navigation, username]);

    const loadComments = useCallback(
        (lastId?: number) => {
            let endpoint = `comments/${huddle?.id}`;
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
        [huddle?.id]
    );

    const load = useCallback(() => {
        if (huddle?.id) {
            loadComments();
        }
    }, [huddle?.id, loadComments]);

    useEffect(() => load(), [load]);

    const {
        renderCommentItem,
        keyCommentExtractor,
        refreshControl,
        onEndReached
    } = useRenderComments(comments, huddle?.id, loadComments, setMention);

    const onSendComment = useCallback(() => {
        loadComments();
        commentsListRef.current?.scrollToIndex({
            index: comments?.length - 1,
            animated: true
        });
    }, [comments?.length, loadComments]);

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
                            <LargeHuddleListItem
                                item={huddle}
                                onProfilePress={() => openHuddleProfile(huddle)}
                                onLikePress={() => onHuddleLikePress(huddle)}
                                onCardLongPress={() =>
                                    openHuddleActions(huddle)
                                }
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
