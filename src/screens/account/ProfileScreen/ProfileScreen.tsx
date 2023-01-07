import React, { useCallback } from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    ComingsUpDataInterface,
    ComingsUpList,
    ComingsUpListItem
} from '@screens/account/ProfileScreen/ProfileScreen.props';

export const ProfileScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const onProfileSettingsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.SettingsScreen);
    }, [navigateTo]);

    const onPeoplePress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.PeopleScreen);
    }, [navigateTo]);

    const onHangoutsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutsScreen);
    }, [navigateTo]);

    const onNotificationsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
    }, [navigateTo]);

    const onMessagesPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.MessagesScreen);
    }, [navigateTo]);

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

    const SectionHeader = ({ title }: { title: string }): JSX.Element => (
        <Text style={ProfileScreenStyle.sectionHeader}>{title}</Text>
    );

    const onItemPress = useCallback(
        (item: ComingsUpListItem) => {
            navigateTo(AccountStackNavigatorEnum.EventScreen, { item });
        },
        [navigateTo]
    );

    const Item = ({ data }: { data: ComingsUpList }) => (
        <View style={ProfileScreenStyle.itemContainer}>
            {data.list.map((value: ComingsUpListItem) => (
                <TouchableOpacity
                    key={value.id}
                    onPress={() => onItemPress(value)}
                    style={ProfileScreenStyle.itemView}
                >
                    <View style={ProfileScreenStyle.itemRow}>
                        <View>
                            <Text style={ProfileScreenStyle.itemText}>
                                {value.name}
                            </Text>
                            <Text style={ProfileScreenStyle.itemText}>
                                {value.time}
                            </Text>
                        </View>
                        <FastImage
                            style={ProfileScreenStyle.itemImage}
                            source={{ uri: value.profilePictures[0] }}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={ProfileScreenStyle.safeArea}>
            <View style={ProfileScreenStyle.container}>
                <View style={ProfileScreenStyle.header}>
                    <TouchableOpacity onPress={onProfileSettingsPress}>
                        <FastImage
                            source={require('@assets/images/profilovka.png')}
                            style={ProfileScreenStyle.image}
                        />
                    </TouchableOpacity>
                    <View style={ProfileScreenStyle.headerInnerContainer}>
                        <View style={ProfileScreenStyle.numbersContainer}>
                            <TouchableOpacity onPress={onPeoplePress}>
                                <Text style={ProfileScreenStyle.number}>
                                    12
                                </Text>
                                <Text style={ProfileScreenStyle.title}>
                                    People
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onHangoutsPress}
                                style={ProfileScreenStyle.hangoutsContainer}
                            >
                                <Text style={ProfileScreenStyle.number}>
                                    32
                                </Text>
                                <Text style={ProfileScreenStyle.title}>
                                    Hangouts
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileScreenStyle.iconContainer}>
                            <IconButton
                                icon={IconEnum.BELL}
                                onPress={onNotificationsPress}
                                size={25}
                                style={ProfileScreenStyle.bellIcon}
                            />
                            <IconButton
                                icon={IconEnum.CHAT_FILLED}
                                onPress={onMessagesPress}
                                size={26}
                            />
                        </View>
                    </View>
                </View>
                <View style={ProfileScreenStyle.comingsUpContainer}>
                    <Text style={ProfileScreenStyle.comingsUpTitle}>
                        Comings up
                    </Text>
                    <SectionList
                        sections={DATA}
                        renderSectionHeader={({ section: { title } }) => (
                            <SectionHeader title={title} />
                        )}
                        renderItem={({ item }) => <Item data={item} />}
                        keyExtractor={(item, index: number) =>
                            item.list[0].profilePictures[0] + index
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
