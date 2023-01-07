import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { PeopleScreenStyle } from '@screens/account/PeopleScreen/PeopleScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const PeopleScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const [inputValue, setInputValue] = useState<string>();

    const onInputChange = (value: string) => {
        setInputValue(value);
    };

    const data: Array<PeopleListItemProps> = [
        {
            name: 'Radek',
            username: '@radekkrejcirik',
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
        },
        {
            name: 'Zuzka',
            username: '@zuzana',
            profilePicture:
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d5/ba/cd/great-paintings-of-bruges.jpg?w=1200&h=-1&s=1'
        }
    ];

    const onItemPress = useCallback(
        (item: PeopleListItemProps) => {
            navigateTo(AccountStackNavigatorEnum.PersonAccountScreen, {
                name: item.name,
                username: item.username,
                profilePicture: item.profilePicture
            });
        },
        [navigateTo]
    );

    const renderItem = ({ item }: ListRenderItemInfo<PeopleListItemProps>) => (
        <TouchableOpacity
            onPress={() => onItemPress(item)}
            style={PeopleScreenStyle.itemView}
        >
            <View>
                <Text style={PeopleScreenStyle.itemTextName}>{item.name}</Text>
                <Text style={PeopleScreenStyle.itemTextUsername}>
                    {item.username}
                </Text>
            </View>
            <FastImage
                source={{ uri: item.profilePicture }}
                style={PeopleScreenStyle.itemImage}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={PeopleScreenStyle.safeArea}>
            <View style={PeopleScreenStyle.container}>
                <Input
                    iconLeft={<Text>🔍</Text>}
                    placeholder="Search for a friend..."
                    onChange={onInputChange}
                    inputType={InputTypeEnum.TEXT}
                    viewStyle={PeopleScreenStyle.inputView}
                    inputStyle={PeopleScreenStyle.input}
                    selectionColor={COLORS.MAIN_BLUE}
                    placeholderTextColor={COLORS.GRAY_800}
                />
                <View style={PeopleScreenStyle.flashListView}>
                    <FlashList
                        data={data}
                        renderItem={renderItem}
                        estimatedItemSize={68}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
