export interface ComingsUpDataInterface {
    title: string;
    data: Array<ComingsUpList>;
}

export interface ComingsUpList {
    list: Array<ComingsUpListItem>;
}

export interface ComingsUpListItem {
    id: number;
    name: string;
    username: string;
    time: string;
    place: string;
    profilePictures: Array<string>;
}
