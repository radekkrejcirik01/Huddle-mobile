import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';

export interface ChatItemProps {
    item: ChatsListDataProps;
    onPress: () => void;
    onLongPress: () => void;
    hasSeen: boolean;
}
