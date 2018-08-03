import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
export default class App extends Component<Props> {
  render() {
    return (
        <RootNavigation/>
    );
  }
}