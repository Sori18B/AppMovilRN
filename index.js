/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// This task is used by Stripe to keep the JS thread awake for background processing.
AppRegistry.registerHeadlessTask('StripeKeepJsAwakeTask', () => 
  async () => {
    // You can leave it empty if you don't need to perform any specific actions.
  }
);