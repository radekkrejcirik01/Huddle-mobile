import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageListItemProps {
    item: MessageItemProps;
    onLongPress: () => void;
    hasSpace: boolean;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
