import { PeopleItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface PeopleListItemProps {
    item: PeopleItemProps;
    onItemPress: () => void;
    onPhotoPress: () => void;
}
