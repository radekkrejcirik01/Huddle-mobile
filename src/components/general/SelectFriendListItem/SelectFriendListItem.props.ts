import { ListRenderItemInfo } from '@shopify/flash-list';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface SelectFriendListItemProps {
    data: ListRenderItemInfo<PeopleListItemProps>;
    onSelect: (value: string) => void;
}
