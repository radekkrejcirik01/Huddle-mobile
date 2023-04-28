import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddlesTabHeader } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { Modal } from '@components/general/Modal/Modal';
import { HuddleModalScreen } from '@components/huddles/HuddleModalScreen/HuddleModalScreen';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';

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

    useEffect(() => loadHuddles(), [loadHuddles]);

    const {
        renderLargeItem,
        keyExtractor,
        refreshControl,
        huddleOpened,
        huddleItem,
        onPressProfilePhoto,
        onPressInteract,
        hideHuddle
    } = useRenderHuddles([], loadHuddles);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <View style={HuddlesScreenStyle.container}>
            <HuddlesTabHeader onPressPlus={() => setStartHuddle(true)} />
            <FlashList
                data={huddles}
                extraData={huddles}
                renderItem={renderLargeItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={HuddlesScreenStyle.listContentContainer}
            />
            <Modal
                isVisible={startHuddle}
                content={<StartHuddleModalScreen onClose={hideStartHuddle} />}
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
            <Modal
                isVisible={huddleOpened}
                content={
                    <HuddleModalScreen
                        huddle={huddleItem}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onPressInteract={onPressInteract}
                        onEdited={loadHuddles}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideHuddle}
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
