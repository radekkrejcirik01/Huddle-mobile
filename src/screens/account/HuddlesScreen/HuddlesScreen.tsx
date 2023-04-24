import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddlesTabHeader } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { Modal } from '@components/general/Modal/Modal';
import { HuddleModalScreen } from '@components/huddles/HuddleModalScreen/HuddleModalScreen';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const [huddleStarted, setHuddleStarted] = useState<boolean>(false);

    const loadHuddles = useCallback(() => {
        getRequestUser<ResponseHuddlesGetInterface>(
            `huddles/${username}`
        ).subscribe((response: ResponseHuddlesGetInterface) => {
            if (response?.status) {
                setHuddles(response?.data);
            }
        });
    }, [username]);

    const {
        renderItem,
        keyExtractor,
        refreshControl,
        huddleOpened,
        huddleItem,
        onPressProfilePhoto,
        onPressInteract,
        hideHuddle
    } = useRenderHuddles(huddles, loadHuddles);

    useEffect(() => loadHuddles(), [loadHuddles]);

    const startHuddle = () => setHuddleStarted(true);

    return (
        <View style={HuddlesScreenStyle.container}>
            <HuddlesTabHeader onPressPlus={startHuddle} />
            <FlashList
                data={huddles}
                extraData={huddles}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={HuddlesScreenStyle.listContentContainer}
            />
            <Modal
                isVisible={huddleStarted}
                content={
                    <StartHuddleModalScreen
                        onClose={() => setHuddleStarted(false)}
                    />
                }
                backdropOpacity={0.7}
                onClose={() => {
                    setHuddleStarted(false);
                    Keyboard.dismiss();
                }}
            />
            <Modal
                isVisible={huddleOpened}
                content={
                    <HuddleModalScreen
                        huddle={huddleItem}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onPressInteract={onPressInteract}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideHuddle}
            />
            {!huddles?.length && (
                <TouchableOpacity
                    onPress={startHuddle}
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
