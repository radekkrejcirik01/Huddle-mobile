import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface MessageListItemAnimatedProps {
    item: MessageItemProps;
    onLongPress: () => void;
    hasSpace: boolean;
}
