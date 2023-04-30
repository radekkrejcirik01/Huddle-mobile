import React, { useCallback, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ProfileTabHeader } from '@components/profile/ProfileTabHeader/ProfileTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleModalScreen } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';

export const ProfileScreen = (): JSX.Element => {
    const { user } = useSelector((state: ReducerProps) => state.user);

    useMessaging();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);
    const [startHuddle, setStartHuddle] = useState<boolean>(false);

    const loadHuddles = useCallback(() => {
        if (user?.username) {
            getRequestUser<ResponseHuddlesGetInterface>(
                `huddles/user/${user?.username}`
            ).subscribe((response: ResponseHuddlesGetInterface) => {
                if (response?.status) {
                    setHuddles(response?.data);
                }
            });
        }
    }, [user?.username]);

    useFocusEffect(useCallback(() => loadHuddles(), [loadHuddles]));

    const { renderSmallItem, keyExtractor, refreshControl } =
        useRenderHuddles(loadHuddles);

    const hideStartHuddle = () => {
        Keyboard.dismiss();
        setStartHuddle(false);
    };

    return (
        <View style={ProfileScreenStyle.container}>
            <ProfileTabHeader />
            <View style={ProfileScreenStyle.content}>
                <View style={ProfileScreenStyle.contentHeaderView}>
                    <Text style={ProfileScreenStyle.title}>Your Huddles</Text>
                    <TouchableOpacity
                        onPress={() => setStartHuddle(true)}
                        style={ProfileScreenStyle.addButtonView}
                    >
                        <Text style={ProfileScreenStyle.addButtonText}>
                            Add new
                        </Text>
                        <Icon
                            name={IconEnum.PLUS}
                            size={12}
                            style={ProfileScreenStyle.plusIcon}
                        />
                    </TouchableOpacity>
                </View>
                <FlashList
                    data={huddles}
                    extraData={huddles}
                    renderItem={renderSmallItem}
                    numColumns={3}
                    keyExtractor={keyExtractor}
                    refreshControl={refreshControl}
                    estimatedItemSize={68}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={ProfileScreenStyle.description}>
                            your confirmed Huddles{'\n'}will appear here 👋
                        </Text>
                    }
                    contentContainerStyle={ProfileScreenStyle.contentContainer}
                />
            </View>
            <Modal
                isVisible={startHuddle}
                content={<StartHuddleModalScreen onClose={hideStartHuddle} />}
                backdropOpacity={0.7}
                onClose={hideStartHuddle}
            />
        </View>
    );
};
