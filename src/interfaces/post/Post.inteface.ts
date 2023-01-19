export interface UserPostInterface {
    username: string;
    firstname: string;
}

export interface UserGetPostInterface {
    username: string;
}

export interface PeopleCreateInvitationPostInterface {
    user: string;
    username: string;
}

export interface ReadMessageInterface {
    username: string;
    user: string;
}

export interface MessagesGetInterface {
    username: string;
    user: string;
}

export interface SendMessageInterface {
    sender: string;
    senderFirstname: string;
    receiver: string;
    message: string;
    time: string;
}

export interface HangoutCreateInterface {
    user: string;
    username: string;
    time: string;
    place: string;
}

export interface HangoutsGetInterface {
    username: string;
    showAll: boolean;
}

export interface GroupHangoutCreateInterface {
    user: string;
    title: string;
    usernames: Array<string>;
    time: string;
    place: string;
    picture: string;
}
