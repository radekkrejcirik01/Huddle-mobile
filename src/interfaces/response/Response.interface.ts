import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { ChatDataProps } from '@components/chat/ChatList/ChatList.props';
import { ComingsUpDataInterface } from '@components/general/SectionList/SectionList.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { EventScreenDataInterface } from '@screens/account/EventScreen/EventScreen.props';
import { MessagesListDataProps } from '@screens/account/MessagesScreen/MessagesScreen.props';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        user: {
            username: string;
            firstname: string;
            profilePicture: string;
        };
        people: number;
        hangouts: number;
    };
}

export interface ResponsePeopleGetInterface {
    status: string;
    message: string;
    data?: Array<PeopleListItemProps>;
}

export interface ResponseCheckInvitationsInterface {
    status: string;
    message: string;
    data?: {
        id: number;
        user: string;
        username: string;
        confirmed: number;
    };
}

export interface ResponseConversationsGetInterface {
    status: string;
    message: string;
    data?: Array<MessagesListDataProps>;
}

export interface MessagesResponseInterface {
    status: string;
    message: string;
    data?: Array<ChatDataProps>;
}

export interface ResponseHangoutsGetInterface {
    status: string;
    message: string;
    data?: Array<ComingsUpDataInterface>;
}

export interface ResponseHangoutGetInterface {
    status: string;
    message: string;
    data?: EventScreenDataInterface;
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
