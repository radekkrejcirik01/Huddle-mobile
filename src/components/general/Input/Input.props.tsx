import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import COLORS from '@constants/COLORS';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    inputType: InputTypeEnum;
    viewStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    selectionColor?: string;
    placeholderTextColor?: string;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
}

export const InputDefaultProps: Omit<InputProps, 'onChange' | 'inputType'> = {
    placeholder: '',
    value: '',
    viewStyle: {},
    inputStyle: {},
    selectionColor: COLORS.WHITE,
    placeholderTextColor: COLORS.WHITE,
    iconRight: undefined
};
