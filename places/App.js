import React from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo from 'expo';
import { Provider } from 'react-redux';

import MapScreen from './src/screens/MapScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import SavedScreen from './src/screens/SavedScreen';
import SettingScreen from './src/screens/SettingScreen';
import DetailMapScreen from './src/screens/DetailMapScreen';

import store from './src/store';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      map: { screen: MapScreen },
      places: { screen: PlacesScreen },
      saved: {
        screen: StackNavigator({
          saved: { screen: SavedScreen },
          setting: { screen: SettingScreen },
          detail: { screen: DetailMapScreen }
        })
      }
    }, {
      tabBarPosition: 'bottom'
    });

    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight, backgroundColor: 'white' }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
