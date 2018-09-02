import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import Server from "../../../constants/config";
import axios from "axios/index";
import Color from "../../../constants/colors";
import {Button, Content, Icon, Item, Label, Text, View} from "native-base";
import Video from "react-native-video";
import AppTemplate from "../appTemplate";
import AddVideos from "./AddVideos";

export default class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.navigation.state.params,
            isLoading: false,
            cloneInterface: []
        };
    }
    _onLoad(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/course/'+this.props.navigation.state.params.id+'/videos').then(response => {
                this.setState({
                    isLoading: false,
                    cloneInterface: response.data
                });
            }).catch(error => {
                // alert("karim")
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }
    async componentDidMount(){
        await this._onLoad();
    }
    render() {
        return (
            <AppTemplate back interface onLoad={()=> this._onLoad()} navigation={this.props.navigation} title={this.props.navigation.state.params.title}>
                <Button
                    dark
                    onPress={() => this.props.navigation.navigate("AddVideos", {...this.state.course, course_id: this.state.course.id})}
                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Add Video </Text>
                    {this.state.isLoading && (
                        <ActivityIndicator size="small" color="#000000" />
                    )}
                    <Icon name="ios-add-circle" style={{color: "#FFFFFF", fontSize: 25}}/>
                </Button>
                <View style={styles.container}>
                    {
                        (this.state.isLoading)? (
                            <View>
                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                            </View>
                        ): (
                            <View>
                                <FlatList
                                    ListEmptyComponent={
                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No videos were found</Text>
                                    }
                                    data={this.state.cloneInterface}
                                    renderItem={({item}) => (
                                        <Item style={{height: 110, flexDirection: 'row', padding: 5}}
                                              onPress={() => this.props.navigation.navigate("AddVideos", {...item, isVideo: true, course_id: this.state.course.id})}
                                        >
                                            <Video source={{uri: Server.storage+item.video}}   // Can be a URL or a local file.
                                                   ref={(ref) => {
                                                       this.player = ref
                                                   }}
                                                   paused={true}
                                                   style={{width:120, height: 100}}
                                            />
                                            <View style={{paddingLeft: 20}}>
                                                <Label>{item.title}</Label>
                                                <Text>{item.description}</Text>
                                            </View>
                                        </Item>

                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                            </View>
                        )
                    }
                </View>
            </AppTemplate>
        )
    }
}
const styles = StyleSheet.create({
    all: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        height: '100%',
        flex: 1,
        flexDirection: "row"
    },
    container: {
        alignSelf: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
});