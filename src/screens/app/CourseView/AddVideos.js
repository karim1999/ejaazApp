import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import {Button, Item, Text, Input, Form, Icon, Label, Textarea, Toast} from 'native-base';
import AppTemplate from "../appTemplate";
import ImagePicker from "react-native-image-picker";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import axios from "axios/index";
import Server from "../../../constants/config";
import UserCourses from "../UserCourses";

export default class AddVideos extends Component {
    constructor(props) {
        super(props);
        let data= {};
        if(this.props.navigation.state.params.isVideo){
            data= {
                title: this.props.navigation.state.params.title,
                description: this.props.navigation.state.params.description,
            }
        }else{
            data= {
                title: "",
                description: "",
            }
        }
        this.state = {
            data: this.props.navigation.state.params,
            isLoading: false,
            video: "",
            ...data,
            isDeleting: false
        };
    }
    selectVideo(){
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        },(error,res) => {
            this.setState({
                video: res.uri
            });
        })
    }
    addOrEdit(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            let data = new FormData();
            if(this.state.data.isVideo){
                data.append('id', this.state.data.id);
            }
            data.append('title', this.state.title);
            data.append('description', this.state.description);
            if (this.state.video) {
                data.append('video', {
                    name: "video",
                    uri: this.state.video,
                    type: 'image/png'
                });
            }
            return axios.post(Server.url + 'api/course/'+this.state.data.course_id+'/addVideo?token='+userToken, data).then(response => {
                this.setState({
                    isLoading: false,
                });
                if(this.state.data.isVideo){
                    Toast.show({
                        text: "A video was edited successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }{
                    Toast.show({
                        text: "A video was added successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }

                this.props.navigation.navigate("Videos", {...this.state.data});
            }).catch(error => {
                alert(error.data)
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }
    deleteVideo(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this video after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/video/'+this.state.data.id+'?token='+userToken).then(response => {
                                this.props.navigation.navigate("Videos", {...this.state.data});
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "The video was deleted successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "Unknown error hs occurred",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Add Course">
                {
                    (this.state.data.isVideo)&& (
                        <Button
                            danger
                            onPress={() => this.deleteVideo()}
                            style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Delete Video </Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon name="delete" type="MaterialCommunityIcons" style={{color: "#FFFFFF", fontSize: 25}}/>
                        </Button>
                    )
                }
                <View style={styles.all}>
                    <Form style={styles.container}>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='pencil' />
                            <Label>Title</Label>
                            <Input onChangeText={(title) => this.setState({title})}
                                   value={this.state.title}
                                   placeholder="ex:Introduction..."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='ios-videocam' />
                            <Label>Video</Label>
                            <Button
                                style={{alignSelf: "center"}}
                                onPress={() => this.selectVideo()} light>
                                <Text>
                                    {
                                        (this.state.video) && (
                                            <Icon name="md-checkmark-circle" style={{color: "green", fontSize: 17, marginRight: 10}} />
                                        )
                                    }
                                    Select</Text>
                            </Button>
                        </Item>
                        <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                            <Icon type="FontAwesome" name='info' />
                            <Text>Description</Text>
                        </Item>
                        <Item style={{marginBottom: 20}}>
                            <Textarea
                                style={{height: 200, paddingTop: 0, marginTop: 0, flex: 1}}
                                rowSpan={5}
                                bordered
                                onChangeText={(description) => this.setState({description})}
                                placeholder="Write more about the course"
                                placeholderTextColor="#ccc5c5"
                                value={this.state.description}
                            />
                        </Item>
                        <Button
                            onPress={() => this.addOrEdit()}
                            style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                            block light
                        >
                            <Text>Save</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20
    },
    content:{
        flexDirection: 'row',
        marginBottom:25,
    },
    contentDescription:{
    },
    input:{
        width: 200,
        padding: 10,
        height:30,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    inputDescription:{
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{
        position: 'absolute',
        right: 15,
    },
    button:{
        backgroundColor: '#6483f7',
        position: 'absolute',
        right: 20,
        bottom: 10
    },
});