import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';
import { StackNavigatorStyle } from '@navigation/StackNavigators/StackNavigator.style';
import DIMENSIONS from '@constants/DIMENSIONS';

export const NavigationScreenHeader: StackNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: StackNavigatorStyle.navigationScreen,
    headerBackTitleStyle: StackNavigatorStyle.headerBackTitle,
    gestureResponseDistance: DIMENSIONS.width,
    headerBackTitle: 'Back'
};
