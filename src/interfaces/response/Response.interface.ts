import { ConversationDataProps } from '@components/conversation/ConversationList/ConversationList.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

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
            profilePicture: string;
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
        profilePicture: string;
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
