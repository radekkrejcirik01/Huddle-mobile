import React, { useCallback, useEffect, useState } from 'react';
import {
    RefreshControl,
    SectionList as SectionListComponent,
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
    SectionListDefaultProps,
    SectionListProps,
    User
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

    const SectionHeader = ({ title }: { title: string }): JSX.Element => (
        <Text style={SectionListStyle.sectionHeader}>{getDay(title)}</Text>
    );

    const onItemPress = useCallback(
        (item: ComingsUpListItem) => {
            navigateTo(AccountStackNavigatorEnum.EventScreen, { item });
        },
        [navigateTo]
    );

    const Item = ({ itemData }: { itemData: ComingsUpList }) => (
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
                                {value.users.map(
                                    (user: User, index: number) => {
                                        if (index === 0) {
                                            return user.firstname;
                                        }
                                        return ` + ${user.firstname}`;
                                    }
                                )}
                            </Text>
                            <Text style={SectionListStyle.itemText}>
                                {value.time}
                            </Text>
                        </View>
                        <FastImage
                            style={SectionListStyle.itemImage}
                            source={{ uri: value?.users[0]?.profilePicture }}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
    return data?.length ? (
        <SectionListComponent
            sections={data}
            renderSectionHeader={({ section: { title } }) => (
                <SectionHeader title={title} />
            )}
            renderItem={({ item }) => <Item itemData={item} />}
            keyExtractor={(item) => item?.list[0]?.id.toString()}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    tintColor="white"
                />
            }
            contentContainerStyle={contentContainerStyle}
        />
    ) : null;
};

SectionList.defaultProps = SectionListDefaultProps;
