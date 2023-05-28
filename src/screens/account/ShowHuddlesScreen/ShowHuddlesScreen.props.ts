export interface HiddenItemProps {
    id: number;
    user: {
        username: string;
        name: string;
        profilePhoto?: string;
    };
    hidden: boolean;
}
