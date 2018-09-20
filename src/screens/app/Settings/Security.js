import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage} from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, Toast} from 'native-base';
import Server from "../../../constants/config"
import {removeUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../appTemplate";

export default class Security extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoading:false,
            oldpassword: "",
            newpassword: "",
        }
      }

      addNewPass(){
        this.setState({
            isLoading: true,
        });
            if(this.state.oldpassword == '' || this.state.newpassword == ''){
                Toast.show({
                    text: "Please fill out fields.",
                    buttonText: "Ok",
                    type: "danger"
                })
                this.setState({
                    isLoading: false,
                });
            }else{
                return AsyncStorage.getItem('token').then(userToken => {
                    return axios.post(Server.url+'api/password?token='+userToken,{
                        oldpassword: this.state.oldpassword,
                        newpassword: this.state.newpassword
                    }).then(response => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.show({
                            text: 'Successfully add new password',
                            type: "success",
                            buttonText: 'Okay'
                        });
                    }).catch(error => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.show({
                            text: "Password does not match.",
                            buttonText: "Ok",
                            type: "danger"
                        })
                    })
                })

            }
      }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Password">
            <View style={styles.all}>
                <Form style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='lock' />
                        <Label>Old password</Label>
                        <Input onChangeText={(oldpassword) => this.setState({oldpassword})}
                            placeholder="Enter previous pass..."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='lock' />
                        <Label>New password</Label>
                        <Input onChangeText={(newpassword) => this.setState({newpassword})}
                            placeholder="Enter new pass..."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Button
                        onPress= {()=> this.addNewPass()}
                        style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                        block light>
                        <Text>Save</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
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
        flex: 1,
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
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