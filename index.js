/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './app/Store/Store';

function AppProvider() {

    <Provider store={store}>
        <App />
    </Provider>

}



AppRegistry.registerComponent(appName, () => App);
