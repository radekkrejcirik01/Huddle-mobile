import { MessageProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageHuddleItemProps {
    item: MessageProps;
    onHuddlePress?: () => void;
    onHuddleProfilePress: () => void;
    onHuddleLikePress?: () => void;
    onHuddleLongPress?: () => void;
    isMessageAbove: boolean;
}
