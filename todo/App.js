import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase';

import RequestOTPScreen from './src/components/screen/RequestOTPScreen';
import VerifyOTPScreen from './src/components/screen/VerifyOTPScreen';
import AddTodoScreen from './src/components/screen/AddTodoScreen';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAFc5UsC-G6C6iyjoLRcvqZe968p3Mbu1k',
      authDomain: 'one-time-password-8b1c9.firebaseapp.com',
      databaseURL: 'https://one-time-password-8b1c9.firebaseio.com',
      projectId: 'one-time-password-8b1c9',
      storageBucket: 'one-time-password-8b1c9.appspot.com',
      messagingSenderId: '64899876778'
    };

    firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = StackNavigator({
      requestOtp: { screen: RequestOTPScreen },
      verifyOtp: { screen: VerifyOTPScreen },
      addTodo: { screen: AddTodoScreen }
    });

    return (
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

export default App;
