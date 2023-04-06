import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import COLORS from '@constants/COLORS';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
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
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HangoutDetailsScreenStyle } from '@screens/account/HangoutDetailsScreen/HangoutDetailsScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { constructDateTime } from '@functions/constructDateTime';
import { formatDateTime } from '@functions/formatDateTime';

export const HangoutPicker = ({
    isVisible,
    onDateTimeChange,
    onPlaceChange,
    onPlaceInputFocusChanged,
    type
}: HangoutPickerProps): JSX.Element => {
    const { selectedUsers } = useSelector(
        (state: ReducerProps) => state.selectUsers
    );
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [suggestedWhen, setSuggestedWhen] = useState<Array<string>>([]);
    const [tappedWhen, setTappedWhen] = useState<string>();
    const [suggestedTimes, setSuggestedTimes] = useState<Array<string>>([]);
    const [tappedTime, setTappedTime] = useState<string>();
    const [place, setPlace] = useState<string>();
    // Date format for DatePicker component
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [dateTimeConfirmed, setDateTimeConfirmed] = useState<boolean>(false);

    const minimumDate = new Date(moment().toString());

    useEffect(() => {
        onDateTimeChange(moment(dateTime));
    }, [dateTime, onDateTimeChange]);

    useEffect(() => {
        onPlaceChange(place);
    }, [onPlaceChange, place]);

    useEffect(() => {
        setDateTime(constructDateTime(tappedWhen, tappedTime));
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

    const formattedDateTime = useMemo(
        (): string => formatDateTime(dateTime),
        [dateTime]
    );

    const openSelectGroupHangoutPeople = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.SelectGroupHangoutUsersScreen);
    }, [navigateTo]);

    return (
        isVisible && (
            <View style={HangoutPickerStyle.container}>
                <View style={HangoutPickerStyle.inputContainer}>
                    <Text style={HangoutPickerStyle.title}>When</Text>
                    <View style={HangoutPickerStyle.tagsRow}>
                        {dateTimeConfirmed ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setOpen(true)}
                                style={HangoutPickerStyle.tagsItem}
                            >
                                <Text style={HangoutPickerStyle.tagText}>
                                    {formattedDateTime}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <>
                                {suggestedWhen.map((value: string) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            if (value === 'Choose a date') {
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
                                                    value === tappedWhen
                                                        ? COLORS.MAIN_WHITE
                                                        : COLORS.BLACK
                                            }
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                HangoutPickerStyle.tagText,
                                                {
                                                    color:
                                                        value === tappedWhen
                                                            ? COLORS.GRAY_100
                                                            : COLORS.WHITE
                                                }
                                            ]}
                                        >
                                            {value}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}
                    </View>
                </View>
                {!dateTimeConfirmed && (
                    <View style={HangoutPickerStyle.inputContainer}>
                        <Text style={HangoutPickerStyle.title}>Time</Text>
                        <View style={HangoutPickerStyle.tagsRow}>
                            {suggestedTimes.map((value: string) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (value === 'Choose a time') {
                                            setOpen(true);
                                        } else {
                                            setTappedTime(value);
                                        }
                                    }}
                                    key={value}
                                    style={[
                                        HangoutPickerStyle.tagsItem,
                                        {
                                            backgroundColor:
                                                value === tappedTime
                                                    ? COLORS.MAIN_WHITE
                                                    : COLORS.BLACK
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            HangoutPickerStyle.tagText,
                                            {
                                                color:
                                                    value === tappedTime
                                                        ? COLORS.GRAY_100
                                                        : COLORS.WHITE
                                            }
                                        ]}
                                    >
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
                        onFocus={() => onPlaceInputFocusChanged(true)}
                        inputType={InputTypeEnum.TEXT}
                        inputStyle={HangoutPickerStyle.input}
                        viewStyle={HangoutPickerStyle.inputView}
                        placeholderTextColor={COLORS.LIGHTGRAY}
                    />
                </View>
                {type === HangoutPickerEnum.GROUP && (
                    <View style={HangoutPickerStyle.inputContainer}>
                        <Text style={HangoutPickerStyle.title}>People</Text>
                        {selectedUsers?.length ? (
                            <View style={HangoutPickerStyle.tagsRow}>
                                {selectedUsers.map((value) => (
                                    <TouchableOpacity
                                        key={value.username}
                                        onPress={openSelectGroupHangoutPeople}
                                        style={HangoutPickerStyle.peopleItem}
                                    >
                                        <FastImage
                                            style={
                                                HangoutPickerStyle.peopleImage
                                            }
                                            source={{
                                                uri: value?.profilePicture
                                            }}
                                        />
                                        <Text
                                            style={
                                                HangoutPickerStyle.peopleText
                                            }
                                        >
                                            {value?.firstname}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <IconButton
                                    icon={IconEnum.PLUS}
                                    onPress={openSelectGroupHangoutPeople}
                                    size={18}
                                    style={HangoutDetailsScreenStyle.plusButton}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={openSelectGroupHangoutPeople}
                                style={HangoutPickerStyle.tagsItem}
                            >
                                <Text style={HangoutPickerStyle.tagText}>
                                    Add people
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                <DatePicker
                    modal
                    open={open}
                    date={dateTime}
                    minimumDate={minimumDate}
                    onConfirm={(value: Date) => {
                        setDateTime(value);
                        setOpen(false);
                        setDateTimeConfirmed(true);
                    }}
                    theme="dark"
                    locale="cz"
                    onCancel={() => setOpen(false)}
                />
            </View>
        )
    );
};

HangoutPicker.defaultProps = HangoutPickerDefaultProps;
