import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseShowPeopleGetInterface
} from '@interfaces/response/Response.interface';
import { HiddenItemProps } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { useRenderHiddenPeople } from '@hooks/useRenderHiddenPeople';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleScreenStyle } from '@screens/account/HuddleScreen/HuddleScreen.style';
import { ShowPeopleUpdatePutInterface } from '@interfaces/post/Post.inteface';
import { ShowHuddlesScreenStyle } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen.style';

export const ShowHuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();

    const [hiddenPeople, setHiddenPeople] = useState<Array<HiddenItemProps>>(
        []
    );
    const changed = useRef<Array<string>>([]);

    const loadHiddenPeople = useCallback(
        (lastId?: number) => {
            let endpoint = `hides/${username}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseShowPeopleGetInterface>(endpoint).subscribe(
                (response: ResponseShowPeopleGetInterface) => {
                    if (response?.status) {
                        if (!lastId) {
                            setHiddenPeople(response?.data);
                            return;
                        }

                        if (lastId && !!response?.data?.length) {
                            setHiddenPeople((value) =>
                                value.concat(response?.data)
                            );
                        }
                    }
                }
            );
        },
        [username]
    );

    useEffect(() => loadHiddenPeople(), [loadHiddenPeople]);

    const save = useCallback(() => {
        putRequestUser<ResponseInterface, ShowPeopleUpdatePutInterface>(
            'hide',
            {
                user: username,
                usernames: changed.current
            }
        ).subscribe((response: ResponseInterface) => {
            if (response.status) {
                navigation.goBack();
            }
        });
    }, [navigation, username]);

    useEffect(
        () =>
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={save}
                        style={HuddleScreenStyle.editButton}
                    >
                        <Text style={HuddleScreenStyle.buttonText}>Save</Text>
                    </TouchableOpacity>
                )
            }),
        [navigation, save]
    );

    const onItemPress = (user: string) => {
        if (changed.current.includes(user)) {
            changed.current = changed.current.filter((item) => item !== user);
        } else {
            changed.current.push(user);
        }
    };

    const {
        renderHiddenPeopleItem,
        refreshControl,
        keyHiddenPeopleExtractor,
        onEndReached
    } = useRenderHiddenPeople(hiddenPeople, loadHiddenPeople, onItemPress);

    return (
        <View style={ShowHuddlesScreenStyle.container}>
            <Text style={ShowHuddlesScreenStyle.title}>
                People who can see your Huddles
            </Text>
            <FlashList
                data={hiddenPeople}
                renderItem={renderHiddenPeopleItem}
                refreshControl={refreshControl}
                keyExtractor={keyHiddenPeopleExtractor}
                estimatedItemSize={68}
                ItemSeparatorComponent={() => <ItemSeparator space={10} />}
                contentContainerStyle={
                    ShowHuddlesScreenStyle.listContentContainer
                }
                onEndReached={onEndReached}
            />
        </View>
    );
};
