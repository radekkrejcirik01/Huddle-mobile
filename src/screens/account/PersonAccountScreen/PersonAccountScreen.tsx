import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { PersonAccountScreenProps } from '@screens/account/PersonAccountScreen/PersonAccountScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { Input } from '@components/general/Input/Input';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HangoutCreateInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { formatDate } from '@functions/formatDate';
import { getDate } from '@functions/getDate';
import { constructDateTime } from '@functions/constructDateTime';

export const PersonAccountScreen = ({
    route
}: PersonAccountScreenProps): JSX.Element => {
    const { firstname, username, profilePicture } = route.params;

    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useNavigation();

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);
    const [suggestedWhen, setSuggestedWhen] = useState<Array<string>>([]);
    const [tappedWhen, setTappedWhen] = useState<string>();
    const [suggestedTimes, setSuggestedTimes] = useState<Array<string>>([]);
    const [tappedTime, setTappedTime] = useState<string>();
    const [place, setPlace] = useState<string>();

    const [dateTimeText, setResultDateText] = useState<string>();
    const [dateTime, setDateTime] = useState<string>();

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const minimumDate = new Date(moment().toString());

    useEffect(() => {
        setDateTime(getDate(tappedWhen, tappedTime));
    }, [tappedWhen, tappedTime]);

    useEffect(() => {
        const hour = moment().hour();
        const minute = moment().minute();

        const conditionHour = hour === 23 ? 0 : hour + 1;

        const base = `${hour.toString()}:`;
        const times = [];
        if (minute <= 15) {
            times.push(`${base}15`, `${base}30`, `${base}45`);
        } else if (minute > 15 && minute <= 30) {
            times.push(
                `${base}30`,
                `${base}45`,
                `${conditionHour.toString()}:00`
            );
        } else if (minute > 30 && minute <= 45) {
            times.push(
                `${base}45`,
                `${conditionHour.toString()}:00`,
                `${conditionHour.toString()}:15`
            );
        } else {
            times.push(
                `${conditionHour.toString()}:00`,
                `${conditionHour.toString()}:15`,
                `${conditionHour.toString()}:30`
            );
        }
        times.push('Choose a time');
        setSuggestedWhen(['Today', 'Tomorrow', 'Choose a date']);
        setSuggestedTimes(times);
        setTappedWhen('Today');
        setTappedTime(times[0]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: username });
    }, [navigation, username]);

    const sendButtonText = useMemo((): string => {
        if (isHangoutSent) {
            return 'Hangout sent ✅';
        }
        return 'Send hangout';
    }, [isHangoutSent]);

    const sendHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutCreateInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/create/hangout',
            {
                user,
                username,
                time: dateTime,
                place
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsHangoutSent(true);
            }
        });
    }, [dateTime, user, username, place]);

    return (
        <View style={PersonAccountScreenStyle.container}>
            <FastImage
                source={{ uri: profilePicture }}
                style={PersonAccountScreenStyle.image}
            />
            <Text style={PersonAccountScreenStyle.name}>{firstname}</Text>
            <View style={PersonAccountScreenStyle.modalContainer}>
                <View style={PersonAccountScreenStyle.inputContainer}>
                    <Text style={PersonAccountScreenStyle.title}>When</Text>
                    <View style={PersonAccountScreenStyle.tagsRow}>
                        {dateTimeText ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setOpen(true)}
                                style={PersonAccountScreenStyle.tagsItem}
                            >
                                <Text style={PersonAccountScreenStyle.tagText}>
                                    {dateTimeText}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                                {suggestedWhen.map((value: string) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            if (
                                                value ===
                                                suggestedWhen[
                                                    suggestedWhen.length - 1
                                                ]
                                            ) {
                                                setOpen(true);
                                            } else {
                                                setTappedWhen(value);
                                            }
                                        }}
                                        key={value}
                                        style={[
                                            PersonAccountScreenStyle.tagsItem,
                                            {
                                                backgroundColor:
                                                    tappedWhen === value
                                                        ? COLORS.MAIN_BLUE
                                                        : COLORS.BLACK
                                            }
                                        ]}
                                    >
                                        <Text
                                            style={
                                                PersonAccountScreenStyle.tagText
                                            }
                                        >
                                            {value}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}
                    </View>
                </View>
                {!dateTimeText && (
                    <View style={PersonAccountScreenStyle.inputContainer}>
                        <Text style={PersonAccountScreenStyle.title}>Time</Text>
                        <View style={PersonAccountScreenStyle.tagsRow}>
                            {suggestedTimes.map((value: string) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (
                                            value ===
                                            suggestedTimes[
                                                suggestedTimes.length - 1
                                            ]
                                        ) {
                                            setOpen(true);
                                            const currentDate = new Date(
                                                moment().toString()
                                            );
                                            if (tappedWhen === 'Tomorrow') {
                                                currentDate.setDate(
                                                    currentDate.getDate() + 1
                                                );
                                            }
                                            setDate(currentDate);
                                        } else {
                                            setTappedTime(value);
                                        }
                                    }}
                                    key={value}
                                    style={[
                                        PersonAccountScreenStyle.tagsItem,
                                        {
                                            backgroundColor:
                                                tappedTime === value
                                                    ? COLORS.MAIN_BLUE
                                                    : COLORS.BLACK
                                        }
                                    ]}
                                >
                                    <Text
                                        style={PersonAccountScreenStyle.tagText}
                                    >
                                        {value}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                <View style={PersonAccountScreenStyle.inputContainer}>
                    <Text style={PersonAccountScreenStyle.title}>Place</Text>
                    <Input
                        value={place}
                        onChange={setPlace}
                        inputType={InputTypeEnum.TEXT}
                        inputStyle={PersonAccountScreenStyle.input}
                        viewStyle={PersonAccountScreenStyle.inputView}
                        placeholderTextColor={COLORS.LIGHTGRAY}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={sendHangout}
                style={PersonAccountScreenStyle.hangoutTouchableOpacity}
            >
                <Text style={PersonAccountScreenStyle.hangoutText}>
                    {sendButtonText}
                </Text>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                minimumDate={minimumDate}
                onConfirm={(datum: Date) => {
                    setOpen(false);
                    setDate(datum);
                    setResultDateText(formatDate(datum));

                    setDateTime(constructDateTime(datum));
                }}
                theme="light"
                locale="cz"
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};
