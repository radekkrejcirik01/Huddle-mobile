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
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage, { Source } from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import DatePicker from 'react-native-date-picker';
import moment, { Moment } from 'moment';
import { ListItem } from '@components/general/ListItem/ListItem';
import { HangoutDetailScreenProps } from '@screens/account/HangoutDetailScreen/HangoutDetailScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseHangoutGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    HangoutDeleteInterface,
    HangoutGetInterface,
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
import {
    EventScreenDataInterface,
    EventUsersInterface
} from '@screens/account/EventScreen/EventScreen.props';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { useNavigation } from '@hooks/useNavigation';
import { useOpenPhoto } from '@hooks/useOpenPhoto';

export const HangoutDetailScreen = ({
    route
}: HangoutDetailScreenProps): JSX.Element => {
    const { hangoutId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useDefaultNavigation();
    const { showActionSheetWithOptions } = useActionSheet();
    const openPhoto = useOpenPhoto();

    const [hangout, setHangout] = useState<EventScreenDataInterface>();

    const {
        createdBy,
        creatorConfirmed,
        picture: photo,
        usernames,
        title,
        time,
        place: plan
    } = useMemo(
        (): EventScreenDataInterface => !!hangout && hangout,
        [hangout]
    );

    const [isSave, setIsSave] = useState<boolean>(false);

    const [photoValue, setPhotoValue] = useState<string>();
    const [titleValue, setTitleValue] = useState<string>();
    const [timeValue, setTimeValue] = useState<Moment>();
    const [planValue, setPlanValue] = useState<string>();

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const minimumDate = new Date(moment().toString());

    const photoRef = useRef<{ buffer: string; fileName: string }>({
        buffer: null,
        fileName: null
    });

    const isUserAdmin = useMemo((): boolean => {
        if (createdBy === username) {
            return true;
        }
        return !creatorConfirmed;
    }, [createdBy, creatorConfirmed, username]);

    useEffect(() => {
        navigation.setOptions({
            ...(!isUserAdmin && {
                headerTitle: 'Details'
            })
        });
    }, [hangoutId, isUserAdmin, navigation]);

    const loadHangout = useCallback(() => {
        if (hangoutId) {
            postRequest<ResponseHangoutGetInterface, HangoutGetInterface>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/hangout',
                {
                    id: hangoutId,
                    username
                }
            ).subscribe((response: ResponseHangoutGetInterface) => {
                if (response?.status) {
                    setPhotoValue(response.data.picture);
                    setTitleValue(response.data.title);
                    setTimeValue(response.data.time);
                    setPlanValue(response.data.place);
                    setHangout(response.data);
                }
            });
        }
    }, [hangoutId, username]);

    const { navigateBack, navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadHangout
    );

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
        } else if (typeof title === 'string') {
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

    const onEditTime = useCallback(() => {
        if (isUserAdmin) {
            setOpenDatePicker(true);
        }
    }, [isUserAdmin]);

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
                    loadHangout();
                }
            });
        },
        [hangoutId, loadHangout]
    );

    const openAddHangoutInvitationsScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.AddHangoutInvitationsScreen, {
            hangoutId
        });
    }, [hangoutId, navigateTo]);

    const deleteHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutDeleteInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/delete/hangout',
            {
                id: hangoutId
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigateTo(AccountStackNavigatorEnum.EventScreen, {
                    hangoutId: 0
                });
                navigateBack();
            }
        });
    }, [hangoutId, navigateBack, navigateTo]);

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

    const openUserAccount = useCallback(
        (item: EventUsersInterface) => {
            navigateTo(AccountStackNavigatorEnum.PersonAccountScreen, {
                username: item.username,
                firstname: item.name,
                profilePicture: item.profilePicture
            });
        },
        [navigateTo]
    );

    const cancelConfirmation = useCallback(() => {}, []);

    const onPressUser = useCallback(
        (value: EventUsersInterface) => {
            let options = ['Cancel'];
            if (value.username === username) {
                options = ['Cancel participation', ...options];
            } else if (isUserAdmin) {
                options = [
                    `Open ${value.name}'s profile`,
                    `Remove ${value.name}`,
                    ...options
                ];
            } else {
                options = [`Open ${value.name}'s profile`, ...options];
            }

            showActionSheetWithOptions(
                {
                    cancelButtonIndex: options.length - 1,
                    options,
                    userInterfaceStyle: 'dark',
                    title: value.username
                },
                (selectedIndex: number) => {
                    if (options.length > 2) {
                        if (selectedIndex === 0) {
                            openUserAccount(value);
                        }
                        if (selectedIndex === 1) {
                            removeUserFromHangout(value.username);
                        }
                    } else if (selectedIndex === 0) {
                        if (value.username === username) {
                            cancelConfirmation();
                        } else {
                            openUserAccount(value);
                        }
                    }
                }
            );
        },
        [
            cancelConfirmation,
            isUserAdmin,
            openUserAccount,
            removeUserFromHangout,
            showActionSheetWithOptions,
            username
        ]
    );

    return (
        <ScrollView
            contentContainerStyle={HangoutDetailScreenStyle.contentContainer}
        >
            <View>
                <TouchableOpacity
                    onPress={() =>
                        isUserAdmin
                            ? onPressChangePhoto()
                            : openPhoto(photoValue)
                    }
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
                    editable={isUserAdmin}
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
                    editable={isUserAdmin}
                    inputType={InputTypeEnum.TEXT}
                    onChange={setPlanValue}
                    viewStyle={HangoutDetailScreenStyle.inputView}
                />
                <Text style={HangoutDetailScreenStyle.text}>People 👨‍👩‍👧‍👦</Text>
                <View style={HangoutDetailScreenStyle.row}>
                    {usernames?.map((value: EventUsersInterface) => (
                        <TouchableOpacity
                            key={value.username}
                            onPress={() => onPressUser(value)}
                            onLongPress={() => onPressUser(value)}
                            style={[
                                HangoutDetailScreenStyle.peopleTouchableOpacity,
                                !value?.confirmed &&
                                    HangoutDetailScreenStyle.opacity
                            ]}
                        >
                            <FastImage
                                style={HangoutDetailScreenStyle.peopleImage}
                                source={{
                                    uri: value?.profilePicture
                                }}
                            />
                            <Text style={HangoutDetailScreenStyle.peopleText}>
                                {value?.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    {isUserAdmin && (
                        <IconButton
                            icon={IconEnum.PLUS}
                            onPress={openAddHangoutInvitationsScreen}
                            size={18}
                            style={HangoutDetailScreenStyle.plusButton}
                        />
                    )}
                </View>
            </View>
            <View>
                {createdBy === username && (
                    <ListItem title="Delete" onPress={onDeleteHangoutPress} />
                )}
                <ListItem
                    title="Cancel confirmation"
                    onPress={cancelConfirmation}
                />
            </View>
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
