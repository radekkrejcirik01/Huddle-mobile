import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useNotifications } from '@hooks/useNotifications';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddlesTabHeader } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const loadHuddles = useCallback(() => {
        if (username) {
            getRequestUser<ResponseHuddlesGetInterface>(
                `huddles/${username}`
            ).subscribe((response: ResponseHuddlesGetInterface) => {
                if (response?.status) {
                    setHuddles(response?.data);
                }
            });
        }
    }, [username]);

    useFocusEffect(useCallback(() => loadHuddles(), [loadHuddles]));

    useNotifications(() => {}, loadHuddles);

    const { renderLargeItem, keyExtractor, refreshControl } =
        useRenderHuddles(loadHuddles);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <View style={HuddlesScreenStyle.container}>
            <HuddlesTabHeader />
            <FlashList
                data={huddles}
                extraData={huddles}
                renderItem={renderLargeItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator space={20} />}
                ListEmptyComponent={
                    <Text style={HuddlesScreenStyle.description}>
                        active Huddles will appear{'\n'}here 👋
                    </Text>
                }
                contentContainerStyle={HuddlesScreenStyle.listContentContainer}
            />
            <Modal
                isVisible={startHuddle}
                content={<StartHuddleModalScreen onClose={hideStartHuddle} />}
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
            {!huddles?.length && (
                <TouchableOpacity
                    onPress={() => setStartHuddle(true)}
                    style={HuddlesScreenStyle.addHuddleTouchableOpacity}
                >
                    <Text style={HuddlesScreenStyle.addHuddleText}>
                        Add Huddle
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
