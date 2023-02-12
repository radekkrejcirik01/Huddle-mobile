import { ChatDataProps } from '@components/chat/ChatList/ChatList.props';

export interface ChatItemProps {
    item: ChatDataProps;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
