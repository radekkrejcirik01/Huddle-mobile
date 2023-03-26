import { ConversationDataProps } from '@components/conversation/ConversationList/ConversationList.props';

export interface ConversationItemProps {
    item: ConversationDataProps;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
