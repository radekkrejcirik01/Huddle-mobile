import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    RefreshControl,
    SectionList as SectionListComponent,
    SectionListRenderItemInfo,
    Text,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { SectionListStyle } from '@components/general/SectionList/SectionList.style';
import {
    ComingsUpDataInterface,
    ComingsUpList,
    ComingsUpListItem,
    ItemDataInterface,
    SectionHeaderInterface,
    SectionInterface,
    SectionListDefaultProps,
    SectionListProps
} from '@components/general/SectionList/SectionList.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseHangoutsGetInterface } from '@interfaces/response/Response.interface';
import { HangoutsGetInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { getDay } from '@functions/getDay';

export const SectionList = ({
    showAll,
    contentContainerStyle
}: SectionListProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [data, setData] = useState<Array<ComingsUpDataInterface>>();
    const [refreshing, setRefreshing] = useState(false);

    const loadHangouts = useCallback(() => {
        postRequest<ResponseHangoutsGetInterface, HangoutsGetInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/get/hangouts',
            {
                username,
                showAll
            }
        ).subscribe((response: ResponseHangoutsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [showAll, username]);

    useEffect(() => {
        if (username) {
            loadHangouts();
        }
    }, [loadHangouts, username]);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            loadHangouts();
            setRefreshing(false);
        }, 1000);
    }, [loadHangouts]);

    const SectionHeader = ({ title }: SectionHeaderInterface): JSX.Element => (
        <Text style={SectionListStyle.sectionHeader}>{getDay(title)}</Text>
    );

    const renderSectionHeader = ({ section: { title } }: SectionInterface) => (
        <SectionHeader title={title} />
    );

    const onItemPress = useCallback(
        (item: ComingsUpListItem) => {
            navigateTo(AccountStackNavigatorEnum.EventScreen, { item });
        },
        [navigateTo]
    );

    const Item = useCallback(
        ({ itemData }: ItemDataInterface) => (
            <View style={SectionListStyle.itemContainer}>
                {itemData.list.map((value: ComingsUpListItem) => (
                    <TouchableOpacity
                        key={value.id}
                        onPress={() => onItemPress(value)}
                        style={SectionListStyle.itemView}
                    >
                        <View style={SectionListStyle.itemRow}>
                            <View>
                                <Text style={SectionListStyle.itemText}>
                                    {value.title}
                                </Text>
                                <Text style={SectionListStyle.itemText}>
                                    {value.time}
                                </Text>
                            </View>
                            <FastImage
                                style={SectionListStyle.itemImage}
                                source={{
                                    uri: value.picture
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        ),
        [onItemPress]
    );

    const renderItem = useCallback(
        ({ item }: SectionListRenderItemInfo<ComingsUpList>) => (
            <Item itemData={item} />
        ),
        [Item]
    );

    const refreshControl = useMemo(
        () => (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
                tintColor="white"
            />
        ),
        [refresh, refreshing]
    );

    if (!data?.length) {
        return null;
    }

    return (
        <SectionListComponent
            sections={data}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            refreshControl={refreshControl}
            contentContainerStyle={contentContainerStyle}
        />
    );
};

SectionList.defaultProps = SectionListDefaultProps;
