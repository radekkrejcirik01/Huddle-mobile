import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';

export interface HuddleInteractionsListItemProps {
    item: HuddleInteractionInterface;
    isConfirmed: boolean;
    onConfirm?: (username: string) => void;
}

export const HuddleInteractionsListItemDefaultProps: Omit<
    HuddleInteractionsListItemProps,
    'item' | 'isConfirmed'
> = {
    onConfirm: null
};
