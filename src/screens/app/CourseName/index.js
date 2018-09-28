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
import { Container, Item, Label, Icon, Toast} from 'native-base';
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Color from "../../../constants/colors";
import AppTemplate from "../appTemplate";

export default class CourseName extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            course: this.props.navigation.state.params,
            cloneVideos: [],
            i: 1,
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
            <AppTemplate back navigation={this.props.navigation} title="Videos">

                    {
                        (this.state.isLoading)? (
                            <View>
                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                            </View>
                        ): (

                        <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No Videos were found</Text>
                            }
                            data={this.state.cloneVideos}
                            renderItem={({item}) => (
                            <Item style={{height: 110, flexDirection: 'row', padding: 20}}
                            onPress={() => this.props.navigation.navigate("OpenVideo", {...item})}
                            >
                                <Text style={{marginRight:4}}>{this.state.i++} </Text>
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
                    )
                }
            </AppTemplate>
        );
    }
}


