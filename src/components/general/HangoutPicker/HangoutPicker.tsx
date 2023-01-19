import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import COLORS from '@constants/COLORS';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { getDate } from '@functions/getDate';
import { formatDate } from '@functions/formatDate';
import { constructDateTime } from '@functions/constructDateTime';
import {
    HangoutPickerDefaultProps,
    HangoutPickerProps
} from '@components/general/HangoutPicker/HangoutPicker.props';
import { HangoutPickerStyle } from '@components/general/HangoutPicker/HangoutPicker.style';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HangoutPickerEnum } from '@components/general/HangoutPicker/HangoutPicker.enum';
import { ReducerProps } from '@store/index/index.props';

export const HangoutPicker = ({
    onDateTimeChange,
    onPlaceChange,
    type
}: HangoutPickerProps): JSX.Element => {
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

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
        onDateTimeChange(dateTime);
    }, [dateTime, onDateTimeChange]);

    useEffect(() => {
        onPlaceChange(place);
    }, [onPlaceChange, place]);

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

    const openPeopleScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.PickPeopleScreen);
    }, [navigateTo]);

    return (
        <View style={HangoutPickerStyle.container}>
            <View style={HangoutPickerStyle.inputContainer}>
                <Text style={HangoutPickerStyle.title}>When</Text>
                <View style={HangoutPickerStyle.tagsRow}>
                    {dateTimeText ? (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setOpen(true)}
                            style={HangoutPickerStyle.tagsItem}
                        >
                            <Text style={HangoutPickerStyle.tagText}>
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
                                        HangoutPickerStyle.tagsItem,
                                        {
                                            backgroundColor:
                                                tappedWhen === value
                                                    ? COLORS.MAIN_BLUE
                                                    : COLORS.BLACK
                                        }
                                    ]}
                                >
                                    <Text style={HangoutPickerStyle.tagText}>
                                        {value}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            </View>
            {!dateTimeText && (
                <View style={HangoutPickerStyle.inputContainer}>
                    <Text style={HangoutPickerStyle.title}>Time</Text>
                    <View style={HangoutPickerStyle.tagsRow}>
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
                                    HangoutPickerStyle.tagsItem,
                                    {
                                        backgroundColor:
                                            tappedTime === value
                                                ? COLORS.MAIN_BLUE
                                                : COLORS.BLACK
                                    }
                                ]}
                            >
                                <Text style={HangoutPickerStyle.tagText}>
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            <View style={HangoutPickerStyle.inputContainer}>
                <Text style={HangoutPickerStyle.title}>Place</Text>
                <Input
                    value={place}
                    onChange={setPlace}
                    inputType={InputTypeEnum.TEXT}
                    inputStyle={HangoutPickerStyle.input}
                    viewStyle={HangoutPickerStyle.inputView}
                    placeholderTextColor={COLORS.LIGHTGRAY}
                />
            </View>
            {type === HangoutPickerEnum.GROUP && (
                <View style={HangoutPickerStyle.inputContainer}>
                    <Text style={HangoutPickerStyle.title}>People</Text>
                    {users?.length ? (
                        <View style={HangoutPickerStyle.tagsRow}>
                            {users.map((value: string) => (
                                <TouchableOpacity
                                    key={value}
                                    onPress={openPeopleScreen}
                                    style={HangoutPickerStyle.peopleItem}
                                >
                                    <Text style={HangoutPickerStyle.tagText}>
                                        {value}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={openPeopleScreen}
                            style={HangoutPickerStyle.tagsItem}
                        >
                            <Text style={HangoutPickerStyle.tagText}>
                                Add a friend
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
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
                theme="dark"
                locale="cz"
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};

HangoutPicker.defaultProps = HangoutPickerDefaultProps;
