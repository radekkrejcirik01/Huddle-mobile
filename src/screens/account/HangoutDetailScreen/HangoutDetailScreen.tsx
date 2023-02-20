import React, { useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from '@components/general/ListItem/ListItem';
import { HangoutDetailScreenProps } from '@screens/account/HangoutDetailScreen/HangoutDetailScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HangoutDeleteInterface } from '@interfaces/post/Post.inteface';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HangoutDetailScreenStyle } from '@screens/account/HangoutDetailScreen/HangoutDetailScreen.style';

export const HangoutDetailScreen = ({
    route
}: HangoutDetailScreenProps): JSX.Element => {
    const { createdByUser, hangoutId } = route.params;

    const navigation = useNavigation();

    const cancelConfirmation = () => {};

    const deleteHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutDeleteInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/delete/hangout',
            {
                id: hangoutId
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigation.navigate(
                    RootStackNavigatorEnum.AccountStack as never,
                    {
                        screen: AccountStackNavigatorEnum.EventScreen,
                        params: { hangoutId: 0 }
                    } as never
                );
                navigation.goBack();
            }
        });
    }, [hangoutId, navigation]);

    const onDeleteHangoutPress = useCallback(() => {
        Alert.alert('Are you sure you want to delete this hangout?', '', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: deleteHangout,
                style: 'destructive'
            }
        ]);
    }, [deleteHangout]);

    return (
        <ScrollView
            contentContainerStyle={HangoutDetailScreenStyle.contentContainer}
        >
            {createdByUser ? (
                <ListItem
                    title="Delete hangout"
                    onPress={onDeleteHangoutPress}
                />
            ) : (
                <ListItem
                    title="Cancel confirmation"
                    onPress={cancelConfirmation}
                />
            )}
        </ScrollView>
    );
};
