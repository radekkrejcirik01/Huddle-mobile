import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';

export interface HuddleInteractionsListItemProps {
    item: HuddleInteractionInterface;
    isConfirmed: boolean;
    onPressPhoto: () => void;
    onConfirm?: () => void;
    onOpenChat: () => void;
}

export const HuddleInteractionsListItemDefaultProps: Omit<
    HuddleInteractionsListItemProps,
    'item' | 'isConfirmed' | 'onPressPhoto' | 'onPressName' | 'onOpenChat'
> = {
    onConfirm: null
};
