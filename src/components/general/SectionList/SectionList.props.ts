import { SectionListData, StyleProp, ViewStyle } from 'react-native';

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
    createdBy: string;
    title: string;
    time: string;
    place: string;
    picture: string;
}

export interface SectionHeaderInterface {
    title: string;
}

export interface SectionInterface {
    section: SectionListData<ComingsUpList>;
}

export interface ItemDataInterface {
    itemData: ComingsUpList;
}
