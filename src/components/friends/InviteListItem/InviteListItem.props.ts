import { InviteItemProps } from '@screens/account/InvitesScreen/InvitesScreen.props';

export interface InviteListItemProps {
    item: InviteItemProps;
    onAccept: () => void;
    onOpenProfile: () => void;
}
