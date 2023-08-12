import { MessageProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageItemProps {
    item: MessageProps;
    name: string;
    profilePhoto: string;
    onMessageLongPress: () => void;
    hasSpace: boolean;
    hasProfilePhoto: boolean;
}

export interface ReactionsInterface {
    username: string;
    reaction: string;
}
