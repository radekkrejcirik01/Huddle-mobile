import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';

export interface HuddleInteractionsListItemProps {
    item: HuddleInteractionInterface;
    onPressPhoto: () => void;
    onOpenChat: () => void;
}
