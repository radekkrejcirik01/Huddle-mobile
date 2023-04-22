import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
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

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

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
        onInteract,
        hideHuddle
    } = useRenderHuddles(huddles, loadHuddles);

    useEffect(() => loadHuddles(), [loadHuddles]);

    return (
        <View style={HuddlesScreenStyle.container}>
            <HuddlesTabHeader />
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
                isVisible={huddleOpened}
                content={
                    <HuddleModalScreen
                        huddle={huddleItem}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onInteract={onInteract}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideHuddle}
            />
        </View>
    );
};
