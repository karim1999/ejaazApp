'use strict';

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import { Container, Item, Label, Icon, Toast, H3} from 'native-base';
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Color from "../../../constants/colors";

export default class OpenVideo extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            openVideo: this.props.navigation.state.params,
        }
    }


    render() {
        return (
            <Container style={styles.all}>
                        
                    <VideoPlayer source={{uri: this.state.openVideo.video}}   // Can be a URL or a local file.
                            ref={(ref) => {
                                this.player = ref
                            }}
                            style={styles.backgroundVideo}
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onEnd={this.onEnd}                      // Callback when playback finishes
                            onError={this.videoError}
                            playInBackground={false}
                            paused={true}
                        />

                        <View style={{padding: 15}}>

                        <H3>{this.state.openVideo.title}</H3>
                        <Text>{this.state.openVideo.description}</Text>

                        </View>

                    
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