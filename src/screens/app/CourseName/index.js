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
        <Video source={{uri: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"}}   // Can be a URL or a local file.
               ref={(ref) => {
                   this.player = ref
               }}
               style={styles.backgroundVideo}
        />

    );
  }
}


var styles = StyleSheet.create({
    backgroundVideo: {
        width: "100%",
        height: 200
    },
});