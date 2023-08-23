export interface ReducerProps {
    user: User;
    device: Device;
    navigationState: NavigationSate;
    conversation: Conversation;
    invites: Invites;
    typing: Typing;
}

export interface User {
    token: string;
    user: {
        firstname: string;
        username: string;
        profilePhoto: string;
    };
}

export interface Device {
    token: string;
}

export interface NavigationSate {
    isReady: boolean;
}

export interface Conversation {
    conversationId: number;
    loadConversation: boolean;
    loadRead: boolean;
}

export interface Invites {
    unseenInvites: number;
}

export interface Typing {
    typing: Array<{
        conversationId: number;
        username: string;
        isTyping: number;
    }>;
}
