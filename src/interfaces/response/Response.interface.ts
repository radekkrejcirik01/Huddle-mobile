export interface ResponseInterface {
    status: string;
    message: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        username: string;
        firstname: string;
        profilePicture: string;
    };
}
