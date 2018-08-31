import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import { Container, Content, Button, Icon, Text, Textarea, Label, Item, Input, Toast, Form } from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import {connect} from "react-redux";

export default class EditCourse extends Component {
    constructor(props){
        super(props);
        this.state={
            course: this.props.navigation.state.params,
            isLoading: false
        }
    }

    EditCourse(id){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            let data = new FormData();
            data.append('title', this.state.title);
            data.append('price', this.state.price);
            data.append('description', this.state.description);
            if (this.state.img) {
                data.append('img', {
                    name: "img",
                    uri: this.state.img,
                    type: 'image/png'
                });
            }
            return axios.post(Server.url + 'api/editCourse/'+id+'?token='+userToken, data).then(response => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "A Course was added successfully",
                    buttonText: "Ok",
                    type: "success"
                });
                this.props.navigation.navigate("CourseView");
            }).catch(error => {
                alert(error.data)
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <AppTemplate course_id={this.state.course.id} back navigation={this.props.navigation} title={this.state.course.title}>
                <Container style={styles.all}>
                    <Form style={styles.container}>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='pencil' />
                            <Label>Title</Label>
                            <Input onChangeText={(title) => this.setState({title})}
                                   placeholder="ex:Web Development..."
                                   placeholderTextColor="#ccc5c5"
                                   value={this.state.course.title}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='dollar' />
                            <Label>Price</Label>
                            <Input onChangeText={(price) => this.setState({price})}
                                   keyboardType='numeric' placeholder="ex:33h..."
                                   placeholder="ex:100..."
                                   placeholderTextColor="#ccc5c5"
                                   value={this.state.course.price}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='md-images' />
                            <Label>Image</Label>
                            <Button
                                style={{alignSelf: "center"}}
                                onPress={() => this.selectImage()} light>
                                <Text>
                                    {
                                        (this.state.img) && (
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
                                style={{height: 200, paddingTop: 0, marginTop: 0}}
                                style={{flex: 1}}
                                rowSpan={5}
                                bordered
                                onChangeText={(description) => this.setState({description})}
                                placeholder="Write more about the course"
                                placeholderTextColor="#ccc5c5"
                                value={this.state.course.description}
                            />
                        </Item>
                        <Button
                            onPress={() => this.EditCourse(this.state.course.id)}
                            style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                            block light>
                            <Text>Save</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                </Container>
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