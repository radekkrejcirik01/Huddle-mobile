import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponsePeopleGetInterface } from '@interfaces/response/Response.interface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';
import { StartHuddlePeopleContentProps } from '@components/huddles/StartHuddlePeopleContent/StartHuddlePeopleContent.props';
import { StartHuddlePeopleContentStyle } from '@components/huddles/StartHuddlePeopleContent/StartHuddlePeopleContent.style';
import { StartHuddlePeopleListItem } from '@components/huddles/StartHuddlePeopleListItem/StartHuddlePeopleListItem';

export const StartHuddlePeopleContent = ({
    onPressAddCard,
    onPeopleChange
}: StartHuddlePeopleContentProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [data, setData] = useState<Array<PeopleListItemProps>>([]);

    const userArray = useRef<Array<string>>([]);

    const loadPeople = useCallback(() => {
        getRequestUser<ResponsePeopleGetInterface>(
            `people/${username}`
        ).subscribe((response: ResponsePeopleGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    useEffect(() => loadPeople(), [loadPeople]);

    const addUser = useCallback(
        (value: string) => {
            if (userArray?.current?.includes(value)) {
                // Remove user if is already in array
                const index = userArray?.current.indexOf(value);
                userArray?.current.splice(index, 1);
            } else {
                // Add user if isn't in array
                userArray?.current.push(value);
            }

            onPeopleChange(userArray?.current);
        },
        [onPeopleChange]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<PeopleListItemProps>): JSX.Element => (
            <StartHuddlePeopleListItem item={item} onSelect={addUser} />
        ),
        [addUser]
    );

    return (
        <View style={StartHuddlePeopleContentStyle.container}>
            <Text style={StartHuddlePeopleContentStyle.peopleText}>
                People who will see your Huddle
            </Text>
            <FlashList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: PeopleListItemProps) =>
                    item?.username?.toString()
                }
                estimatedItemSize={68}
                numColumns={3}
                contentContainerStyle={
                    StartHuddlePeopleContentStyle.listContentContainer
                }
            />
            <TouchableOpacity
                onPress={onPressAddCard}
                style={StartHuddlePeopleContentStyle.addButtonView}
            >
                <Text style={StartHuddlePeopleContentStyle.addButtonText}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    );
};
