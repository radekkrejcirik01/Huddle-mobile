import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageListItemProps {
    item: MessageItemProps;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
