import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfilePhotoScreenProps } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen.props';
import { usePhotoScrollView } from '@hooks/usePhotoScrollView';
import { ProfileAnimatedImage } from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage';
import { ProfilePhotoScreenStyle } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen.style';

export const ProfilePhotoScreen = ({
    route
}: ProfilePhotoScreenProps): JSX.Element => {
    const { name, profilePhoto } = route.params;

    const navigation = useNavigation();

    const { scale, onScroll } = usePhotoScrollView();

    useEffect(() => {
        navigation.setOptions({
            title: name
        });
    }, [name, navigation]);

    return (
        <Animated.ScrollView
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={ProfilePhotoScreenStyle.scrollView}
        >
            <ProfileAnimatedImage source={profilePhoto} scale={scale} />
        </Animated.ScrollView>
    );
};
