'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

export default class CourseName extends Component {

  render() {
    return (
          <Video
            source={require('./broadchurch.mp4')}
           
          />
      
    );
  }
}


