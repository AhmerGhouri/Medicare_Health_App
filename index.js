/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {

    console.log("id" , id);
    console.log("phase" , phase);
    console.log("actualDuration" , actualDuration);
    console.log("baseDuration" , baseDuration);
    console.log("starttime" , startTime);
    console.log("commitTime" , commitTime);


}



AppRegistry.registerComponent(appName, () => App);
