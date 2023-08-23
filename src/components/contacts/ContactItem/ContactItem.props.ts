import { FriendsItemProps } from '@screens/account/ContactsScreen/ContactsScreen.props';

export interface ContactItemProps {
    item: FriendsItemProps;
    onItemPress: () => void;
    oItemLongPress: () => void;
    onPhotoPress: () => void;
    onAcceptPress: () => void;
}
