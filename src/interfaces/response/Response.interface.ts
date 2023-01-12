import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { Moment } from 'moment';
import { ChatDataProps } from '@components/chat/ChatList/ChatList.props';

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
