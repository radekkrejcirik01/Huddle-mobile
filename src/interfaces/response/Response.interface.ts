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
