import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';

export interface FriendsListItemProps {
    item: FriendsItemProps;
    onItemPress: () => void;
    onPhotoPress: () => void;
    onAcceptPress: () => void;
}
