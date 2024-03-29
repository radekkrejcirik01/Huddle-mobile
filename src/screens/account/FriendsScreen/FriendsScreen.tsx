import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRenderFriends } from '@hooks/useRenderFriends';
import { useModal } from '@hooks/useModal';
import { FriendsScreenStyle } from '@screens/account/FriendsScreen/FriendsScreen.style';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AddFriendModalScreen } from '@components/friends/AddFriendModalScreen/AddFriendModalScreen';
import { Modal } from '@components/general/Modal/Modal';

export const FriendsScreen = (): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    const [inputValue, setInputValue] = useState<string>();
    const [data, setData] = useState<Array<FriendsItemProps>>([]);
    const [filteredData, setFilteredData] = useState<Array<FriendsItemProps>>(
        []
    );

    const loadFriends = (lastId?: number) => {
        let endpoint = 'people';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequestUser<ResponseFriendsGetInterface>(endpoint).subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    if (!lastId) {
                        setData(response?.data);
                        setFilteredData(response?.data);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setData((value) => value.concat(response?.data));
                    }
                }
            }
        );
    };

    useFocusEffect(
        useCallback(() => {
            loadFriends();
        }, [])
    );

    const filterData = useCallback(
        (value: string) => {
            setInputValue(value);

            const text = value.toLowerCase();
            const filteredName = data.filter((item: FriendsItemProps) =>
                item.name.toLowerCase().match(text)
            );

            setFilteredData(filteredName);
        },
        [data]
    );

    const {
        renderFriendsItem,
        keyFriendsExtractor,
        refreshControl,
        onEndReached
    } = useRenderFriends(data, loadFriends);

    const hideKeyboardAndModal = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    return (
        <View style={FriendsScreenStyle.container}>
            <Input
                iconLeft={<Text>🔍</Text>}
                placeholder="Who you looking for?..."
                value={inputValue}
                onChange={filterData}
                inputType={InputTypeEnum.TEXT}
                inputStyle={FriendsScreenStyle.input}
            />
            <FlashList
                data={filteredData}
                renderItem={renderFriendsItem}
                refreshControl={refreshControl}
                keyExtractor={keyFriendsExtractor}
                estimatedItemSize={68}
                ListEmptyComponent={
                    <>
                        <Text style={FriendsScreenStyle.description}>
                            your friends are waiting for that invite
                        </Text>
                        <TouchableOpacity
                            onPress={showModal}
                            style={FriendsScreenStyle.descriptionButtonView}
                        >
                            <Text
                                style={FriendsScreenStyle.descriptionButtonText}
                            >
                                invite
                            </Text>
                        </TouchableOpacity>
                    </>
                }
                onEndReached={onEndReached}
            />
            <Modal
                isVisible={modalVisible}
                content={
                    <AddFriendModalScreen onClose={hideKeyboardAndModal} />
                }
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </View>
    );
};
