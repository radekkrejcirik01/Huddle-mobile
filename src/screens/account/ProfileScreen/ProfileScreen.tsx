import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useMessaging } from '@hooks/useMessaging';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ProfileTabHeader } from '@components/profile/ProfileTabHeader/ProfileTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';

export const ProfileScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    useMessaging();
    const { top } = useSafeAreaInsets();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const loadHuddles = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = `user-huddles/${username}`;
                if (lastId) {
                    endpoint += `/${lastId}`;
                }

                getRequestUser<ResponseHuddlesGetInterface>(endpoint).subscribe(
                    (response: ResponseHuddlesGetInterface) => {
                        if (response?.status && !!response?.data?.length) {
                            if (lastId) {
                                setHuddles((value) =>
                                    value.concat(response?.data)
                                );
                            } else {
                                setHuddles(response?.data);
                            }
                        }
                    }
                );
            }
        },
        [username]
    );

    useEffect(() => loadHuddles(), [loadHuddles]);

    const {
        renderSmallItem,
        keyExtractor,
        refreshControl,
        onScrollBeginDrag,
        onEndReachedSmallItem
    } = useRenderHuddles(huddles, loadHuddles);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <View style={[ProfileScreenStyle.container, { top }]}>
            <FlashList
                ListHeaderComponent={
                    <>
                        <ProfileTabHeader />
                        {!!huddles?.length && (
                            <View style={ProfileScreenStyle.contentHeaderView}>
                                <Text style={ProfileScreenStyle.title}>
                                    Your Huddles
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setStartHuddle(true)}
                                    style={ProfileScreenStyle.addButtonView}
                                >
                                    <Icon
                                        name={IconEnum.PLUS}
                                        size={12}
                                        style={ProfileScreenStyle.plusIcon}
                                    />
                                    <Text
                                        style={ProfileScreenStyle.addButtonText}
                                    >
                                        Huddle
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                }
                data={huddles}
                extraData={huddles}
                renderItem={renderSmallItem}
                numColumns={3}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={onScrollBeginDrag}
                onEndReached={onEndReachedSmallItem}
                ListEmptyComponent={
                    <Text style={ProfileScreenStyle.description}>
                        your Huddles will appear{'\n'}here 👋
                    </Text>
                }
            />
            <Modal
                isVisible={startHuddle}
                content={<StartHuddleModalScreen onClose={hideStartHuddle} />}
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
        </View>
    );
};
