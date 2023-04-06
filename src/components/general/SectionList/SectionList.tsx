import React, {
    ForwardedRef,
    forwardRef,
    useCallback,
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
import { getLocalHourFromUTC } from '@functions/getLocalHourFromUTC';

export const SectionList = forwardRef(
    (
        { isHistory, contentContainerStyle }: SectionListProps,
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
                let endpoint =
                    'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/hangouts';
                if (isHistory) {
                    endpoint += '/history';
                }
                postRequest<ResponseHangoutsGetInterface, HangoutsGetInterface>(
                    endpoint,
                    {
                        username
                    }
                ).subscribe((response: ResponseHangoutsGetInterface) => {
                    if (response?.status) {
                        setData(response?.data);
                    }
                });
            }
        }, [isHistory, username]);

        useImperativeHandle(reference, () => ({
            loadHangouts
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
                navigateTo(AccountStackNavigatorEnum.HangoutScreen, {
                    hangoutId: item.id
                });
            },
            [navigateTo]
        );

        const Item = useCallback(
            ({ itemData }: ItemDataInterface) => (
                <View style={SectionListStyle.itemContainer}>
                    {itemData.list.map((value: ComingsUpListItem) => {
                        const createdAndUnconfirmed =
                            value.createdBy === username &&
                            !value.creatorConfirmed;

                        return (
                            <TouchableOpacity
                                key={value.id}
                                onPress={() => onItemPress(value)}
                                style={[
                                    SectionListStyle.itemView,
                                    createdAndUnconfirmed &&
                                        SectionListStyle.blackBgColor
                                ]}
                            >
                                <View style={SectionListStyle.itemRow}>
                                    <View>
                                        <Text
                                            style={[
                                                SectionListStyle.itemText,
                                                createdAndUnconfirmed &&
                                                    SectionListStyle.mainWhiteColor
                                            ]}
                                        >
                                            {value.title}
                                        </Text>
                                        <Text
                                            style={[
                                                SectionListStyle.itemText,
                                                createdAndUnconfirmed &&
                                                    SectionListStyle.mainWhiteColor
                                            ]}
                                        >
                                            {getLocalHourFromUTC(value.time)}
                                        </Text>
                                    </View>
                                    {value?.picture ? (
                                        <FastImage
                                            source={{
                                                uri: value.picture
                                            }}
                                            style={SectionListStyle.itemImage}
                                        />
                                    ) : (
                                        <View
                                            style={SectionListStyle.itemImage}
                                        >
                                            <Text style={SectionListStyle.text}>
                                                {value?.type === 'hangout'
                                                    ? '🙂'
                                                    : '👨‍👩‍👧‍👦'}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ),
            [onItemPress, username]
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
