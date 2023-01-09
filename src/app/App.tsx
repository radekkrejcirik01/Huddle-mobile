import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '@store/index/index';
import { BAR_STYLE } from '@app/App.const';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';

const App = () => {
    PreloadService.init().catch();

    return (
        <SafeAreaProvider>
            <StatusBar animated barStyle={BAR_STYLE} />
            <Provider store={store}>
                <Navigation />
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
