import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Alert,
    ImageRequireSource,
    ScrollView,
    Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage, { Source } from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import DatePicker from 'react-native-date-picker';
import moment, { Moment } from 'moment';
import { ListItem } from '@components/general/ListItem/ListItem';
import { HangoutDetailScreenProps } from '@screens/account/HangoutDetailScreen/HangoutDetailScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import {
    HangoutDeleteInterface,
    HangoutUpdateInterface,
    RemoveHangoutUserInterface
} from '@interfaces/post/Post.inteface';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HangoutDetailScreenStyle } from '@screens/account/HangoutDetailScreen/HangoutDetailScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Input } from '@components/general/Input/Input';
import { formatDate } from '@functions/formatDate';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';
import { getUTCDateTime } from '@functions/getUTCDateTime';
import { ReducerProps } from '@store/index/index.props';
import { EventUsersInterface } from '@screens/account/EventScreen/EventScreen.props';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';

export const HangoutDetailScreen = ({
    route
}: HangoutDetailScreenProps): JSX.Element => {
    const { hangoutId, hangout } = route.params;
    const {
        createdBy,
        picture: photo,
        usernames,
        title,
        time,
        place: plan
    } = hangout;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();

    const [isSave, setIsSave] = useState<boolean>(false);

    const [photoValue, setPhotoValue] = useState<string>(photo);
    const [titleValue, setTitleValue] = useState<string>(title);
    const [timeValue, setTimeValue] = useState<Moment>(time);
    const [planValue, setPlanValue] = useState<string>(plan);

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const minimumDate = new Date(moment().toString());

    const photoRef = useRef<{ buffer: string; fileName: string }>({
        buffer: null,
        fileName: null
    });

    const save = useCallback(() => {
        postRequest<ResponseInterface, HangoutUpdateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/update/hangout',
            {
                id: hangoutId,
                buffer: photoValue === photo ? null : photoRef?.current?.buffer,
                fileName:
                    photoValue === photo ? null : photoRef?.current?.fileName,
                title: titleValue === title ? null : titleValue,
                time:
                    timeValue === time
                        ? null
                        : getUTCDateTime(timeValue.toISOString()),
                plan: planValue === plan ? null : planValue
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsSave(false);
            }
        });
    }, [
        hangoutId,
        photo,
        photoValue,
        plan,
        planValue,
        time,
        timeValue,
        title,
        titleValue
    ]);

    useEffect(() => {
        if (
            photoValue === photo &&
            titleValue === title &&
            timeValue === time &&
            planValue === plan
        ) {
            setIsSave(false);
        } else {
            setIsSave(true);
        }
    }, [
        photo,
        photoValue,
        plan,
        planValue,
        time,
        timeValue,
        title,
        titleValue
    ]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isSave && (
                    <TouchableOpacity onPress={save}>
                        <Text style={HangoutDetailScreenStyle.save}>Save</Text>
                    </TouchableOpacity>
                )
        });
    }, [isSave, navigation, save]);

    const source = useMemo(
        (): Source | ImageRequireSource => ({ uri: photoValue }),
        [photoValue]
    );

    const onPressChangePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            photoRef.current.buffer = await fs.readFile(image?.path, 'base64');
            photoRef.current.fileName = image.filename;

            setPhotoValue(image.path);
        });
    }, []);

    const onEditTime = () => {
        setOpenDatePicker(true);
    };

    const removeUserFromHangout = useCallback(
        (usernameValue: string) => {
            postRequest<ResponseInterface, RemoveHangoutUserInterface>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/remove/hangout/user',
                {
                    id: hangoutId,
                    username: usernameValue
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    Alert.alert(response?.message);
                }
            });
        },
        [hangoutId]
    );

    const onPressUser = useCallback(
        (value: EventUsersInterface) => {
            const options = ['Remove from hangout', 'Cancel'];

            showActionSheetWithOptions(
                {
                    cancelButtonIndex: 1,
                    options,
                    userInterfaceStyle: 'dark',
                    title: value.username
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        removeUserFromHangout(value.username);
                    }
                }
            );
        },
        [removeUserFromHangout, showActionSheetWithOptions]
    );

    const openPeopleScreen = useCallback(() => {
        const usernamesArray = [];
        for (let i = 0; i < usernames.length; i += 1) {
            usernamesArray.push(usernames[i].username);
        }
        navigation.navigate(
            AccountStackNavigatorEnum.PickPeopleScreen as never,
            {
                hangoutId,
                usernames: usernamesArray
            } as never
        );
    }, [hangoutId, navigation, usernames]);

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
            <View>
                <TouchableOpacity
                    onPress={onPressChangePhoto}
                    style={HangoutDetailScreenStyle.imageTouchableOpacity}
                >
                    <FastImage
                        source={source}
                        style={HangoutDetailScreenStyle.image}
                    />
                </TouchableOpacity>
                <Text style={HangoutDetailScreenStyle.text}>Title 🖋</Text>
                <Input
                    value={titleValue}
                    inputType={InputTypeEnum.TEXT}
                    onChange={setTitleValue}
                    viewStyle={HangoutDetailScreenStyle.inputView}
                />
                <Text style={HangoutDetailScreenStyle.text}>Time ⏳</Text>
                <Input
                    value={formatDate(
                        new Date(getLocalDateTimeFromUTC(timeValue))
                    )}
                    onPressOut={onEditTime}
                    editable={false}
                    inputType={InputTypeEnum.TEXT}
                    viewStyle={HangoutDetailScreenStyle.inputView}
                />
                <Text style={HangoutDetailScreenStyle.text}>Place 🗺</Text>
                <Input
                    value={planValue}
                    inputType={InputTypeEnum.TEXT}
                    onChange={setPlanValue}
                    viewStyle={HangoutDetailScreenStyle.inputView}
                />
                <Text style={HangoutDetailScreenStyle.text}>People 👨‍👩‍👧‍👦</Text>
                <View style={HangoutDetailScreenStyle.row}>
                    {usernames.map(
                        (value: EventUsersInterface) =>
                            value.username !== username && (
                                <TouchableOpacity
                                    key={value.username}
                                    onPress={() => onPressUser(value)}
                                    style={[
                                        HangoutDetailScreenStyle.peopleTouchableOpacity,
                                        !value.confirmed &&
                                            HangoutDetailScreenStyle.opacity
                                    ]}
                                >
                                    <FastImage
                                        style={
                                            HangoutDetailScreenStyle.peopleImage
                                        }
                                        source={{ uri: value.profilePicture }}
                                    />
                                    <Text
                                        style={
                                            HangoutDetailScreenStyle.peopleText
                                        }
                                    >
                                        {value.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                    )}
                    <IconButton
                        icon={IconEnum.PLUS}
                        onPress={openPeopleScreen}
                        size={18}
                        style={HangoutDetailScreenStyle.plusButton}
                    />
                </View>
            </View>
            {createdBy === username ? (
                <ListItem title="Delete" onPress={onDeleteHangoutPress} />
            ) : (
                <ListItem
                    title="Cancel confirmation"
                    onPress={cancelConfirmation}
                />
            )}
            <DatePicker
                modal
                open={openDatePicker}
                date={new Date(timeValue?.toString())}
                minimumDate={minimumDate}
                onConfirm={(date: Date) => {
                    setOpenDatePicker(false);

                    setTimeValue(moment(date));
                }}
                theme="dark"
                locale="cz"
                onCancel={() => setOpenDatePicker(false)}
            />
        </ScrollView>
    );
};
