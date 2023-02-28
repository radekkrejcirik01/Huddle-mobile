import { NavigationContainerRef } from '@react-navigation/native';

class NavigationServiceClass {
    navigationRef: NavigationContainerRef<object>;

    setNavigationRef = (navigationRef: NavigationContainerRef<object>) => {
        this.navigationRef = navigationRef;
    };

    getNavigationRef = () => this.navigationRef;
}

const NavigationService: NavigationServiceClass = new NavigationServiceClass();
export { NavigationService };
