import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageListItemProps {
    item: MessageItemProps;
    name: string;
    profilePhoto: string;
    onMessageLongPress: () => void;
    onHuddlePress?: () => void;
    onHuddleProfilePress: () => void;
    onHuddleLikePress?: () => void;
    onHuddleLongPress?: () => void;
    onHuddleMorePress?: () => void;
    hasSpace: boolean;
    isMessageAbove: boolean;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
