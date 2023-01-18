import { Moment } from 'moment';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { ChatDataProps } from '@components/chat/ChatList/ChatList.props';
import { ComingsUpDataInterface } from '@components/general/SectionList/SectionList.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

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

export interface ResponseConversationsGetInterface {
    status: string;
    message: string;
    data?: Array<{
        username: string;
        firstname: string;
        profilePicture: string;
        message: string;
        time: Moment;
        isRead: number;
    }>;
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

export interface ResponseNotificationsGetInterface {
    status: string;
    message: string;
    data?: Array<NotificationsListProps>;
}
