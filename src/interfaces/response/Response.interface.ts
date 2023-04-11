import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { ConversationDataProps } from '@components/conversation/ConversationList/ConversationList.props';
import { ComingsUpDataInterface } from '@components/general/SectionList/SectionList.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { HangoutScreenDataInterface } from '@screens/account/HangoutScreen/HangoutScreen.props';

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

export interface ResponseFriendsGetInterface {
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

export interface ResponseHangoutsGetInterface {
    status: string;
    message: string;
    data?: Array<ComingsUpDataInterface>;
}

export interface ResponseHangoutGetInterface {
    status: string;
    message: string;
    data?: HangoutScreenDataInterface;
}

export interface ResponseGetHangoutUsernamesInterface {
    status: string;
    message?: string;
    data?: Array<string>;
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

export interface ResponseGetConversationUsersInterface {
    status: string;
    message: string;
    data: Array<string>;
}

export interface ResponseUploadImageInterface {
    status: string;
    message: string;
    imageUrl: string;
}
