import { SectionListData, StyleProp, ViewStyle } from 'react-native';
import { Moment } from 'moment';

export interface SectionListForwardRefProps {
    loadHangouts: () => void;
}

export interface SectionListProps {
    isHistory?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionListDefaultProps: SectionListProps = {
    isHistory: false,
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
    time: Moment;
    place: string;
    picture: string;
    type: string;
    creatorConfirmed: number;
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
