'use strict';

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Container, Item, Label, } from 'native-base';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

export default class CourseName extends Component {

    render() {
        return (
            <Container style={styles.all}>
                <VideoPlayer source={{uri: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}
                       style={styles.backgroundVideo}
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.videoError}
                       playInBackground={false}
                       paused={true}
                       selectedTextTrack={{
                           type: "title",
                           value: "Dubbing"
                       }}
                />
                <Item style={{height: 110, flexDirection: 'row', padding: 20}}>
                    <Video source={{uri: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"}}   // Can be a URL or a local file.
                           ref={(ref) => {
                               this.player = ref
                           }}
                           paused={true}
                           style={{width:120, height: 100}}
                    />
                    <View style={{paddingLeft: 20}}>
                        <Label>Introduction web design</Label>
                        <Text>Instructor name</Text>
                    </View>
                </Item>
            </Container>
        );
    }
}


var styles = StyleSheet.create({
    all:{
    },
    backgroundVideo: {
        width: "100%",
        height: 200
    },
});