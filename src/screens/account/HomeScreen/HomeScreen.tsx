import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { SectionList } from '@components/general/SectionList/SectionList';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { setUserStateAction } from '@store/UserReducer';
import { SectionListForwardRefProps } from '@components/general/SectionList/SectionList.props';
import { useNotifications } from '@hooks/useNotifications';
import { HomeTabHeader } from '@components/home/HomeTabHeader/HomeTabHeader';

export const HomeScreen = (): JSX.Element => {
    const { user } = useSelector((state: ReducerProps) => state.user);
    const dispatch = useDispatch();

    useMessaging();

    const sectionListRef = useRef<SectionListForwardRefProps>();

    const refreshUser = useCallback(() => {
        postRequest<ResponseUserGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get',
            {
                username: user?.username
            }
        ).subscribe((response: ResponseUserGetInterface) => {
            if (response?.status) {
                dispatch(setUserStateAction(response?.data));
            }
        });
    }, [dispatch, user?.username]);

    useNotifications(refreshUser, sectionListRef?.current?.loadHangouts);

    const onFocus = useCallback(() => {
        if (user?.username) {
            refreshUser();
            sectionListRef.current.loadHangouts();
        }
    }, [refreshUser, user?.username]);

    useEffect(() => {
        if (user?.username) {
            sectionListRef.current.loadHangouts();
        }
    }, [user?.username]);

    useNavigation(RootStackNavigatorEnum.AccountStack, onFocus);

    return (
        <SafeAreaView style={HomeScreenStyle.safeArea}>
            <View style={HomeScreenStyle.container}>
                <HomeTabHeader />
                <View style={HomeScreenStyle.comingsUpContainer}>
                    <Text style={HomeScreenStyle.comingsUpTitle}>
                        Comings up
                    </Text>
                    <SectionList ref={sectionListRef} />
                </View>
            </View>
        </SafeAreaView>
    );
};
