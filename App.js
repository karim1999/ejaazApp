import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
        <RootNavigation/>
    );
  }
}
