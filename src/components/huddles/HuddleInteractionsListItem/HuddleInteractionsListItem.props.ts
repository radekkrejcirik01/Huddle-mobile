import { HuddleInteractionInterface } from '@components/huddles/HuddleModalScreen/HuddleModalScreen.props';

export interface HuddleInteractionsListItemProps {
    hasConfirmedUser: boolean;
    item: HuddleInteractionInterface;
    onConfirm: (username: string) => void;
}
