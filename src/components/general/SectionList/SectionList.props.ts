import { StyleProp, ViewStyle } from 'react-native';

export interface SectionListProps {
    showAll?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionListDefaultProps: SectionListProps = {
    showAll: false,
    contentContainerStyle: {}
};

export interface ComingsUpDataInterface {
    title: string;
    data: Array<ComingsUpList>;
}

export interface ComingsUpList {
    list: Array<ComingsUpListItem>;
}

export interface ComingsUpListItem {
    id: number;
    createdBy: User;
    users: Array<User>;
    time: string;
    place: string;
}

export interface User {
    username: string | null;
    firstname: string | null;
    profilePicture: string | null;
}
