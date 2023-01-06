import { DefaultTheme } from '@react-navigation/native';
import COLORS from '@constants/COLORS';

export const DARK_THEME = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.BLACK
    }
};
