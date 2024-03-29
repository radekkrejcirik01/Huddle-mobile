import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Keyboard,
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View
} from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import {
    CommentInputProps,
    Mention
} from '@components/huddles/CommentInput/CommentInput.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import {
    HuddleAddMentionCommentPostInterface,
    HuddleCommentPostInterface
} from '@interfaces/post/Post.inteface';
import { CommentInputStyle } from '@components/huddles/CommentInput/CommentInput.style';

export const CommentInput = ({
    huddleId,
    onSend,
    mention: mentionValue,
    mentions
}: CommentInputProps): JSX.Element => {
    const [commentMessage, setCommentMessage] = useState<string>();
    const [mentionSuggest, setMentionSuggest] = useState<boolean>();
    const [mention, setMention] = useState<Mention>(null);
    const [filteredData, setFilteredData] = useState(mentions);

    const inputRef = useRef(null);

    useEffect(() => {
        if (mentionValue) {
            setMention(mentionValue);
            inputRef?.current?.focus();
        }
    }, [mentionValue]);

    const filterData = useCallback(
        (value: string) => {
            const text = value.toLowerCase();
            const filteredName = mentions?.filter((item: Mention) =>
                item?.name.toLowerCase().match(text)
            );

            setFilteredData(filteredName);
        },
        [mentions]
    );

    const getMentionSuggestionsListHeight = useCallback((): number => {
        const itemsHeight = filteredData?.length * 25;
        const separatorsHeight = (filteredData?.length - 1) * 15;

        return itemsHeight + separatorsHeight + 20; // 20 is total vertical padding of the container
    }, [filteredData?.length]);

    const addComment = useCallback(
        () =>
            postRequestUser<ResponseInterface, HuddleCommentPostInterface>(
                'comment',
                {
                    huddleId,
                    message: commentMessage
                }
            ).subscribe((response: ResponseInterface) => {
                setCommentMessage('');
                if (response?.status) {
                    onSend();
                }
            }),
        [commentMessage, huddleId, onSend]
    );

    const addMentionComment = useCallback(
        () =>
            postRequestUser<
                ResponseInterface,
                HuddleAddMentionCommentPostInterface
            >('comment-mention', {
                receiver: mention?.username,
                huddleId,
                message: commentMessage
            }).subscribe((response: ResponseInterface) => {
                setCommentMessage('');
                if (response?.status) {
                    setMention(null);
                    onSend();
                }
            }),
        [commentMessage, huddleId, mention?.username, onSend]
    );

    const renderMentionItem = useCallback(
        ({ item }: ListRenderItemInfo<Mention>): JSX.Element => (
            <TouchableOpacity
                onPress={() => {
                    setMention(item);
                    setMentionSuggest(false);
                    setCommentMessage('');
                }}
                style={CommentInputStyle.mentionItemView}
            >
                <FastImage
                    source={{ uri: item.profilePhoto }}
                    style={CommentInputStyle.mentionItemImage}
                />
                <Text style={CommentInputStyle.mentionItemText}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        ),
        []
    );

    const onChangeText = useCallback(
        (text: string) => {
            setCommentMessage(text);

            if (mentions?.length) {
                if (!mention && !text.includes(' ') && text[0] === '@') {
                    setMentionSuggest(true);
                    filterData(text.substring(1));
                }

                if (
                    mentionSuggest &&
                    (text.slice(-1) === ' ' || !text?.length)
                ) {
                    setMentionSuggest(false);
                }
            }
        },
        [filterData, mention, mentionSuggest, mentions?.length]
    );

    const onKeyPress = useCallback(
        (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (!commentMessage?.length && e.nativeEvent.key === 'Backspace') {
                setMention(null);
            }
        },
        [commentMessage?.length]
    );

    const placeholder = useMemo(
        (): string => (mention ? '' : 'Add comment'),
        [mention]
    );

    const onPressSend = useCallback(() => {
        if (mention) {
            addMentionComment();
        } else {
            addComment();
        }
        Keyboard.dismiss();
    }, [addComment, addMentionComment, mention]);

    return (
        <>
            {!!mentions?.length && mentionSuggest && !!filteredData?.length && (
                <View
                    style={[
                        CommentInputStyle.mentionListContainer,
                        { height: getMentionSuggestionsListHeight() }
                    ]}
                >
                    <FlashList
                        data={filteredData}
                        renderItem={renderMentionItem}
                        estimatedItemSize={55}
                        keyboardShouldPersistTaps="always"
                        ItemSeparatorComponent={() => (
                            <ItemSeparator space={15} />
                        )}
                    />
                </View>
            )}
            <View style={CommentInputStyle.bottomContainer}>
                <View style={CommentInputStyle.inputView}>
                    {!!mention && (
                        <Text style={CommentInputStyle.mentionText}>
                            @{mention?.name}
                        </Text>
                    )}
                    <TextInput
                        ref={inputRef}
                        value={commentMessage}
                        onChangeText={onChangeText}
                        multiline
                        onKeyPress={onKeyPress}
                        placeholder={placeholder}
                        placeholderTextColor={COLORS.WHITE}
                        selectionColor={COLORS.WHITE}
                        style={CommentInputStyle.input}
                    />
                    <View style={CommentInputStyle.sendView}>
                        <TouchableOpacity onPress={onPressSend}>
                            <Text style={CommentInputStyle.send}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};
