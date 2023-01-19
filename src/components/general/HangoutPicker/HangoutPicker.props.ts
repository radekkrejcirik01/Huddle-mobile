import { HangoutPickerEnum } from '@components/general/HangoutPicker/HangoutPicker.enum';

export interface HangoutPickerProps {
    onDateTimeChange: (value: string) => void;
    onPlaceChange: (value: string) => void;
    type?: HangoutPickerEnum | null;
}

export const HangoutPickerDefaultProps: Omit<
    HangoutPickerProps,
    'onDateTimeChange' | 'onPlaceChange'
> = {
    type: null
};
