import { ListRenderItemInfo } from '@shopify/flash-list';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface PickPeopleListItemProps {
    data: ListRenderItemInfo<PeopleListItemProps>;
    onPressPerson: (value: string) => void;
}
