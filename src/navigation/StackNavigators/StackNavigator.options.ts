import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';
import { StackNavigatorStyle } from '@navigation/StackNavigators/StackNavigator.style';

export const NavigationScreenHeader: StackNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: StackNavigatorStyle.navigationScreen,
    headerBackTitle: 'Back',
    headerBackTitleStyle: StackNavigatorStyle.headerBackTitle
};
