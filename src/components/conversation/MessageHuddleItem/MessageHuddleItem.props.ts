import { MessageProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageHuddleItemProps {
    item: MessageProps;
    onHuddlePress?: () => void;
    onHuddleProfilePress: () => void;
    onHuddleLikePress?: () => void;
    onHuddleLongPress?: () => void;
    onHuddleOpenLikes: () => void;
    isMessageAbove: boolean;
}

export const MessageHuddleItemDefaultProps: Omit<
    MessageHuddleItemProps,
    'item' | 'onHuddleProfilePress' | 'onHuddleOpenLikes' | 'isMessageAbove'
> = {
    onHuddlePress: null,
    onHuddleLikePress: null,
    onHuddleLongPress: null
};
