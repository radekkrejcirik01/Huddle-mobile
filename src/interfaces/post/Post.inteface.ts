export interface UserPostInterface {
    username: string;
    firstname: string;
    password: string;
}

export interface LoginPostInterface {
    username: string;
    password: string;
}

export interface UserNotificationPutInterface {
    notification: string;
    value: number;
}

export interface AddPersonInvitePostInterface {
    receiver: string;
}

export interface AddHuddlePostInterface {
    name: string;
    message: string;
}

export interface HuddleLikePostInterface {
    huddleId: number;
    message: string;
    receiver: string;
}

export interface HuddleCommentPostInterface {
    huddleId: number;
    message: string;
}

export interface HuddleAddMentionCommentPostInterface {
    receiver: string;
    huddleId: number;
    message: string;
}

export interface HuddleLikeCommentPostInterface {
    receiver: string;
    commentId: number;
    huddleId: number;
}

export interface ShowPeopleUpdatePutInterface {
    usernames: Array<string>;
}

export interface MuteHuddlesPostInterface {
    muted: string;
}

export interface BlockUserPostInterface {
    blocked: string;
}

export interface ConversationNotificationsPostInterface {
    conversationId: number;
}

export interface MessagePostInterface {
    conversationId: number;
    message: string;
    buffer?: string;
    fileName?: string;
}

export interface MessageReactionPostInterface {
    receiver: string;
    message: string;
    conversationId: number;
    messageId: number;
    value: string;
}

export interface LastReadMessagePostInterface {
    conversationId: number;
}

export interface ConversationLikePostInterface {
    conversationId: number;
}

export interface AcceptPersonInviteInterface {
    id: number;
    receiver: string;
}

export interface DevicePostInterface {
    deviceToken: string;
}

export interface UploadProfileImageInterface {
    buffer: string;
    fileName: string;
}
