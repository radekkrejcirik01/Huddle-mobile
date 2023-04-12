import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';
import { setUserStateAction } from '@store/UserReducer';
import { useNotifications } from '@hooks/useNotifications';
import { HomeTabHeader } from '@components/home/HomeTabHeader/HomeTabHeader';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const HomeScreen = (): JSX.Element => {
    const { user } = useSelector((state: ReducerProps) => state.user);
    const dispatch = useDispatch();

    useMessaging();

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

    useNotifications(refreshUser, () => {});

    const onFocus = useCallback(() => {
        if (user?.username) {
            refreshUser();
        }
    }, [refreshUser, user?.username]);

    useNavigation(RootStackNavigatorEnum.AccountStack, onFocus);

    const addHuddle = useCallback(() => {}, []);

    return (
        <View style={HomeScreenStyle.container}>
            <HomeTabHeader />
            <View style={HomeScreenStyle.content}>
                <View>
                    <Text style={HomeScreenStyle.title}>Active Huddles</Text>
                    <Text style={HomeScreenStyle.description}>
                        your upcoming Huddles{'\n'}will appear here 👋
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={addHuddle}
                    style={HomeScreenStyle.addHuddleTouchableOpacity}
                >
                    <Text style={HomeScreenStyle.addHuddleText}>
                        Add Huddle
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
