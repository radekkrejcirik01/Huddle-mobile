import { ListRenderItemInfo } from '@shopify/flash-list';
import { FriendsListItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';

export interface SelectFriendListItemProps {
    data: ListRenderItemInfo<FriendsListItemProps>;
    onSelect: (value: string) => void;
}
