import React, {
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import {
    RefreshControl,
    SectionList as SectionListComponent,
    SectionListRenderItemInfo,
    Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
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
    SectionListForwardRefProps,
    SectionListProps
} from '@components/general/SectionList/SectionList.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseHangoutsGetInterface } from '@interfaces/response/Response.interface';
import { HangoutsGetInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { getDay } from '@functions/getDay';

export const SectionList = forwardRef(
    (
        { showAll, contentContainerStyle }: SectionListProps,
        reference: ForwardedRef<SectionListForwardRefProps>
    ): JSX.Element => {
        const { username } = useSelector(
            (state: ReducerProps) => state.user.user
        );

        const { navigateTo } = useNavigation(
            RootStackNavigatorEnum.AccountStack
        );

        const [data, setData] = useState<Array<ComingsUpDataInterface>>();
        const [refreshing, setRefreshing] = useState(false);

        const loadHangouts = useCallback(() => {
            if (username) {
                postRequest<ResponseHangoutsGetInterface, HangoutsGetInterface>(
                    'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/hangouts',
                    {
                        username,
                        showAll
                    }
                ).subscribe((response: ResponseHangoutsGetInterface) => {
                    if (response?.status) {
                        setData(response?.data);
                    }
                });
            }
        }, [showAll, username]);

        useEffect(() => {
            loadHangouts();
            return loadHangouts();
        }, [loadHangouts, username]);

        useImperativeHandle(reference, () => ({
            refresh: loadHangouts
        }));

        const refresh = useCallback(() => {
            setRefreshing(true);
            setTimeout(() => {
                loadHangouts();
                setRefreshing(false);
            }, 1000);
        }, [loadHangouts]);

        const SectionHeader = ({
            title
        }: SectionHeaderInterface): JSX.Element => (
            <Text style={SectionListStyle.sectionHeader}>{getDay(title)}</Text>
        );

        const renderSectionHeader = ({
            section: { title }
        }: SectionInterface) => <SectionHeader title={title} />;

        const onItemPress = useCallback(
            (item: ComingsUpListItem) => {
                navigateTo(AccountStackNavigatorEnum.EventScreen, {
                    hangoutId: item.id
                });
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
                initialNumToRender={20}
                contentContainerStyle={contentContainerStyle}
            />
        );
    }
);

SectionList.defaultProps = SectionListDefaultProps;
