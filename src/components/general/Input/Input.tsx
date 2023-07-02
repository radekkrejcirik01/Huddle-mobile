import React, {
    ForwardedRef,
    forwardRef,
    useEffect,
    useMemo,
    useState
} from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import {
    InputDefaultProps,
    InputProps
} from '@components/general/Input/Input.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { InputStyle } from '@components/general/Input/Input.style';

export const Input = forwardRef(
    (
        {
            placeholder,
            value,
            onChange,
            inputType,
            viewStyle,
            inputStyle,
            selectionColor,
            placeholderTextColor,
            iconLeft,
            iconRight,
            ...props
        }: InputProps,
        ref: ForwardedRef<TextInput>
    ): JSX.Element => {
        const [inputValue, setInputValue] = useState<string>();
        const [isSecured, setIsSecured] = useState<boolean>(
            inputType === InputTypeEnum.PASSWORD
        );

        useEffect(() => {
            setInputValue(value);
        }, [value]);

        const alignItems = useMemo(
            (): StyleProp<ViewStyle> =>
                inputType !== InputTypeEnum.TEXT_AREA && InputStyle.centerItems,
            [inputType]
        );

        const keyboardType = useMemo(() => {
            if (inputType === InputTypeEnum.EMAIL) {
                return 'email-address';
            }
            return 'default';
        }, [inputType]);

        const onChangeText = (e: string) => {
            setInputValue(e);
            if (onChange) {
                onChange(e);
            }
        };

        const inputIcon = useMemo((): JSX.Element => {
            const SecuredIcon = (): JSX.Element => (
                <TouchableOpacity
                    onPress={() => setIsSecured(!isSecured)}
                    disabled={inputType !== InputTypeEnum.PASSWORD}
                >
                    {isSecured ? (
                        <Icon name={IconEnum.LOCK} size={24} />
                    ) : (
                        <Icon name={IconEnum.UNLOCK} size={24} />
                    )}
                </TouchableOpacity>
            );

            return inputType === InputTypeEnum.PASSWORD ? (
                <SecuredIcon />
            ) : (
                iconRight
            );
        }, [isSecured, inputType, iconRight]);

        return (
            <View style={[InputStyle.container, alignItems, viewStyle]}>
                {iconLeft}
                <TextInput
                    ref={ref}
                    value={inputValue}
                    placeholder={placeholder}
                    selectionColor={selectionColor}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardAppearance="light"
                    keyboardType={keyboardType}
                    style={[InputStyle.input, inputStyle]}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={isSecured}
                    onChangeText={onChangeText}
                    {...props}
                />
                {inputIcon}
            </View>
        );
    }
);

Input.defaultProps = InputDefaultProps;
