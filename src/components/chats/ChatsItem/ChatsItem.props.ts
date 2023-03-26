import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';

export interface ChatsItemProps {
    item: ChatsListDataProps;
    onPress: (item: ChatsListDataProps) => void;
    onDelete: (id: number) => void;
}
