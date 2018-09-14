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
    FlatList
} from 'react-native';
import { Container, Item, Label, Icon, Toast} from 'native-base';
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

export default class CourseName extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            course: this.props.navigation.state.params,
            cloneVideos: [],
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        return axios.get(Server.url+'api/course/'+this.state.course.course_id+'/videos')
        .then(response => {
            this.setState({
                isLoading: false,
                cloneVideos:response.data
            })
        }).catch(error => {
            this.setState({
                isLoading: false,
            });
            Toast.show({
                text: "Error reaching the server.",
                buttonText: "Ok",
                type: "danger"
            })
        })
    }

    render() {
        return (
            <Container style={styles.all}>
            <Icon type="Entypo" name='chevron-left' />
            {this.state.cloneVideos.map((result, i) =>
            <VideoPlayer source={{uri: this.state.cloneVideos[0].video}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}
                        key={ i }
                       style={styles.backgroundVideo}
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.videoError}
                       playInBackground={false}
                       paused={true}
                       toggleResizeModeOnFullscreen={true}
                       controlTimeout={5000}
                       navigator={'CourseView'}
                />
            )}
                
                <Icon type="Entypo" name='chevron-right' />

                <FlatList
                    ListEmptyComponent={
                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No Videos were found</Text>
                    }
                    data={this.state.cloneVideos}
                    renderItem={({item}) => (
                    <Item style={{height: 110, flexDirection: 'row', padding: 20}}>
                        <Video source={{uri: item.video}}   // Can be a URL or a local file.
                            ref={(ref) => {
                                this.player = ref
                            }}
                            paused={true}
                            style={{width:120, height: 100}}
                        />
                        <View style={{paddingLeft: 20}}>
                            <Label>{item.title}</Label>
                            <Text>{_.truncate(item.description)}</Text>
                        </View>
                    </Item>
                    )}
                    keyExtractor = { (item, index) => index.toString() }
                />
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