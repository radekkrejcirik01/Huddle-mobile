import { ConversationDataProps } from '@components/conversation/ConversationList/ConversationList.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { HuddleInteractionInterface } from '@components/huddles/HuddleModalScreen/HuddleModalScreen.props';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        user: {
            id: number;
            username: string;
            firstname: string;
            profilePhoto: string;
        };
        people: number;
        huddles: number;
        notifications: number;
        unreadMessages: number;
    };
}

export interface ResponsePeopleGetInterface {
    status: string;
    message: string;
    data?: Array<PeopleListItemProps>;
}

export interface ResponseHuddlesGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleItemInterface>;
}

export interface ResponseHuddleGetInterface {
    status: string;
    message: string;
    data?: HuddleItemInterface;
}

export interface ResponseHuddlesInteractionsGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleInteractionInterface>;
    confirmedUser?: string;
}

export interface ResponseGetPersonInviteInterface {
    status: string;
    message: string;
    data?: {
        sender: string;
        receiver: string;
        type: string;
        accepted: number;
    };
}

export interface ResponseChatsGetInterface {
    status: string;
    message: string;
    data?: Array<ChatsListDataProps>;
}

export interface MessagesResponseInterface {
    status: string;
    message: string;
    data?: Array<ConversationDataProps>;
}

export interface ResponseNotificationsGetInterface {
    status: string;
    message: string;
    data?: Array<NotificationsListProps>;
}

export interface ConversationDetailsInterface {
    id: number;
    name: string;
    picture: string;
    users: Array<{
        username: string;
        firstname: string;
        profilePhoto: string;
    }>;
    createdBy: string;
    type: string;
}

export interface ResponseConversationCreateInterface {
    status: string;
    message: string;
    data?: ConversationDetailsInterface;
}

export interface ResponseGetConversationDetailsInterface {
    status: string;
    message: string;
    data?: ConversationDetailsInterface;
}

export interface ResponseUploadImageInterface {
    status: string;
    message: string;
    imageUrl: string;
}
