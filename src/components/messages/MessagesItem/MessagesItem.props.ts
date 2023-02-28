import { MessagesListDataProps } from '@screens/account/MessagesScreen/MessagesScreen.props';

export interface MessagesItemProps {
    item: MessagesListDataProps;
    onPress: (item: MessagesListDataProps) => void;
    onDelete: (id: number) => void;
}
