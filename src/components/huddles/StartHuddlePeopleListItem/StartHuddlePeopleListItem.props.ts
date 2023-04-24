import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface StartHuddlePeopleListItemProps {
    item: PeopleListItemProps;
    onSelect: (value: string) => void;
}
