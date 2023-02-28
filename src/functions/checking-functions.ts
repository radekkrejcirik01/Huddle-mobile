import { Platform } from 'react-native';

export const isAndroid = (): boolean => Platform.OS === 'android';
export const isiOS = (): boolean => Platform.OS === 'ios';

export const isArrayEqual = (
    array1: Array<string | number>,
    array2: Array<string | number>
): boolean =>
    array1?.length === array2?.length &&
    array1
        .slice()
        .sort()
        .every((value, index) => value === array2.slice().sort()[index]);
