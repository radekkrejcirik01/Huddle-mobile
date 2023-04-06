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
import { HangoutDetailsScreenProps } from '@screens/account/HangoutDetailsScreen/HangoutDetailsScreen.props';
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
import { HangoutDetailsScreenStyle } from '@screens/account/HangoutDetailsScreen/HangoutDetailsScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Input } from '@components/general/Input/Input';
import { formatDateTime } from '@functions/formatDateTime';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';
import { ReducerProps } from '@store/index/index.props';
import {
    HangoutScreenDataInterface,
    HangoutUserInterface
} from '@screens/account/HangoutScreen/HangoutScreen.props';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { useNavigation } from '@hooks/useNavigation';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { ParticipantsList } from '@components/general/ParticipantsList/ParticipantsList';
import { ParticipantsListProps } from '@components/general/ParticipantsList/ParticipantsList.props';

export const HangoutDetailsScreen = ({
    route
}: HangoutDetailsScreenProps): JSX.Element => {
    const { hangoutId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useDefaultNavigation();
    const { showActionSheetWithOptions } = useActionSheet();
    const openPhoto = useOpenPhoto();

    const [hangout, setHangout] = useState<HangoutScreenDataInterface>();

    const {
        createdBy,
        creatorConfirmed,
        picture: photo,
        usernames,
        title,
        time,
        place: plan
    } = useMemo(
        (): HangoutScreenDataInterface => !!hangout && hangout,
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
            ...(isUserAdmin && {
                headerTitle: 'Edit'
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
        const data: HangoutUpdateInterface = {
            id: hangoutId
        };

        if (photoValue !== photo) {
            data.buffer = photoRef?.current?.buffer;
            data.fileName = photoRef?.current?.fileName;
        }
        if (titleValue !== title) {
            data.title = titleValue;
        }
        if (timeValue !== time) {
            data.time = timeValue;
        }
        if (planValue !== plan) {
            data.plan = planValue;
        }

        postRequest<ResponseInterface, HangoutUpdateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/update/hangout',
            data
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
                        <Text style={HangoutDetailsScreenStyle.save}>Save</Text>
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
                navigateTo(AccountStackNavigatorEnum.HangoutScreen, {
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
        (item: HangoutUserInterface) => {
            navigateTo(AccountStackNavigatorEnum.FriendProfileScreen, {
                username: item.username,
                firstname: item.firstname,
                profilePicture: item.profilePicture
            });
        },
        [navigateTo]
    );

    const cancelParticipation = useCallback(() => {
        postRequest<ResponseInterface, RemoveHangoutUserInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/cancel/hangout/participation',
            {
                id: hangoutId,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                loadHangout();
            }
        });
    }, [hangoutId, loadHangout, username]);

    const onPressUser = useCallback(
        (value: HangoutUserInterface) => {
            let options = ['Cancel'];
            if (value.username === username) {
                options = ['Cancel participation', ...options];
            } else if (isUserAdmin) {
                options = ['Open profile', 'Remove', ...options];
            } else {
                options = [`Open profile`, ...options];
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
                            cancelParticipation();
                        } else {
                            openUserAccount(value);
                        }
                    }
                }
            );
        },
        [
            cancelParticipation,
            isUserAdmin,
            openUserAccount,
            removeUserFromHangout,
            showActionSheetWithOptions,
            username
        ]
    );

    return (
        <ScrollView
            contentContainerStyle={HangoutDetailsScreenStyle.contentContainer}
        >
            <View>
                <TouchableOpacity
                    onPress={() =>
                        isUserAdmin
                            ? onPressChangePhoto()
                            : openPhoto(photoValue)
                    }
                    style={HangoutDetailsScreenStyle.imageTouchableOpacity}
                >
                    <FastImage
                        source={source}
                        style={HangoutDetailsScreenStyle.image}
                    />
                </TouchableOpacity>
                <Text style={HangoutDetailsScreenStyle.text}>Title 🖋</Text>
                <Input
                    value={titleValue}
                    editable={isUserAdmin}
                    inputType={InputTypeEnum.TEXT}
                    onChange={setTitleValue}
                    viewStyle={HangoutDetailsScreenStyle.inputView}
                />
                <Text style={HangoutDetailsScreenStyle.text}>Time ⏳</Text>
                <Input
                    value={formatDateTime(
                        new Date(getLocalDateTimeFromUTC(timeValue))
                    )}
                    onPressOut={onEditTime}
                    editable={false}
                    inputType={InputTypeEnum.TEXT}
                    viewStyle={HangoutDetailsScreenStyle.inputView}
                />
                <Text style={HangoutDetailsScreenStyle.text}>Place 🗺</Text>
                <Input
                    value={planValue}
                    editable={isUserAdmin}
                    inputType={InputTypeEnum.TEXT}
                    onChange={setPlanValue}
                    viewStyle={HangoutDetailsScreenStyle.inputView}
                />
                <Text style={HangoutDetailsScreenStyle.text}>People 👨‍👩‍👧‍👦</Text>
                <View style={HangoutDetailsScreenStyle.row}>
                    <ParticipantsList
                        usernames={usernames}
                        onPressUser={
                            onPressUser as ParticipantsListProps['onPressUser']
                        }
                    />
                    {isUserAdmin && (
                        <IconButton
                            icon={IconEnum.PLUS}
                            onPress={openAddHangoutInvitationsScreen}
                            size={18}
                            style={HangoutDetailsScreenStyle.plusButton}
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
                    onPress={cancelParticipation}
                />
            </View>
            <DatePicker
                modal
                open={openDatePicker}
                date={moment(timeValue).toDate()}
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
