import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';

export interface ChatItemProps {
    item: ChatsListDataProps;
    onPress: (item: ChatsListDataProps) => void;
    hasSeen: boolean;
}
