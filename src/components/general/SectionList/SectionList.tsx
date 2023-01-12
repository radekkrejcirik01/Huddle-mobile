import React, { useCallback, useState } from 'react';
import {
    RefreshControl,
    SectionList as SectionListComponent,
    Text,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    ComingsUpDataInterface,
    ComingsUpList,
    ComingsUpListItem
} from '@screens/account/HomeScreen/HomeScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { SectionListStyle } from '@components/general/SectionList/SectionList.style';
import {
    SectionListDefaultProps,
    SectionListProps
} from '@components/general/SectionList/SectionList.props';

export const SectionList = ({
    data: BigData,
    contentContainerStyle
}: SectionListProps): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const DATA: Array<ComingsUpDataInterface> = [
        {
            title: 'Today',
            data: [
                {
                    list: [
                        {
                            id: 1,
                            name: 'Radek',
                            username: '@radek',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        },
                        {
                            id: 2,
                            name: 'Tom',
                            username: '@',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        },
                        {
                            id: 3,
                            name: 'Zuzka',
                            username: '@',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Tomorrow',
            data: [
                {
                    list: [
                        {
                            id: 4,
                            name: 'Zuzka',
                            username: '@',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: '13. 1.',
            data: [
                {
                    list: [
                        {
                            id: 5,
                            name: 'Dominika + Tom + Radek',
                            username: '@',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1',
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        },
                        {
                            id: 6,
                            name: 'Tom',
                            username: '@',
                            time: '12:25',
                            place: 'Coffee shop at Krymska',
                            profilePictures: [
                                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const SectionHeader = ({ title }: { title: string }): JSX.Element => (
        <Text style={SectionListStyle.sectionHeader}>{title}</Text>
    );

    const onItemPress = useCallback(
        (item: ComingsUpListItem) => {
            navigateTo(AccountStackNavigatorEnum.EventScreen, { item });
        },
        [navigateTo]
    );

    const Item = ({ data }: { data: ComingsUpList }) => (
        <View style={SectionListStyle.itemContainer}>
            {data.list.map((value: ComingsUpListItem) => (
                <TouchableOpacity
                    key={value.id}
                    onPress={() => onItemPress(value)}
                    style={SectionListStyle.itemView}
                >
                    <View style={SectionListStyle.itemRow}>
                        <View>
                            <Text style={SectionListStyle.itemText}>
                                {value.name}
                            </Text>
                            <Text style={SectionListStyle.itemText}>
                                {value.time}
                            </Text>
                        </View>
                        <FastImage
                            style={SectionListStyle.itemImage}
                            source={{ uri: value.profilePictures[0] }}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
    return (
        <SectionListComponent
            sections={DATA}
            renderSectionHeader={({ section: { title } }) => (
                <SectionHeader title={title} />
            )}
            renderItem={({ item }) => <Item data={item} />}
            keyExtractor={(item, index: number) =>
                item.list[0].profilePictures[0] + index
            }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    tintColor="white"
                />
            }
            contentContainerStyle={contentContainerStyle}
        />
    );
};

SectionList.defaultProps = SectionListDefaultProps;
