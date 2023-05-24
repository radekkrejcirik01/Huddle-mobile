export interface UserPostInterface {
    username: string;
    firstname: string;
}

export interface AddPersonInvitePostInterface {
    sender: string;
    receiver: string;
}

export interface AddHuddlePostInterface {
    sender: string;
    what: string;
}

export interface HuddleInteractPostInterface {
    huddleId: number;
    sender: string;
    receiver: string;
}

export interface HuddleUpdatePutInterface {
    id: number;
    what: string;
}

export interface HuddleConfirmPostInterface {
    huddleId: number;
    sender: string;
    receiver: string;
}

export interface HuddleAddCommentPostInterface {
    sender: string;
    huddleId: number;
    message: string;
}

export interface HuddleAddMentionCommentPostInterface {
    sender: string;
    receiver: string;
    huddleId: number;
    message: string;
}

export interface HuddleLikeCommentPostInterface {
    sender: string;
    receiver: string;
    commentId: number;
    huddleId: number;
}

export interface SendMessageInterface {
    sender: string;
    name: string;
    conversationId: number;
    message: string;
    buffer?: string;
    fileName?: string;
}

export interface AcceptPersonInviteInterface {
    id: number;
    sender: string;
    receiver: string;
}

export interface DeviceInterface {
    username: string;
    deviceToken: string;
}

export interface UploadProfileImageInterface {
    username: string;
    buffer: string;
    fileName: string;
}
