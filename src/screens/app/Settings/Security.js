import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, } from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, Toast} from 'native-base';
import Server from "../../../constants/config"
import {removeUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios"

export default class Security extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    render() {
        return (
            <Container style={styles.all}>
                <Form style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='lock' />
                        <Label>New password</Label>
                        <Input onChangeText={(newPassword) => this.setState({newPassword})}
                            placeholder="Enter previous pass..."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='lock' />
                        <Label>Confirm password</Label>
                        <Input onChangeText={(confPasswrod) => this.setState({confPasswrod})}
                            keyboardType='numeric' placeholder="Enter new pass..."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Button
                        style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                        block light>
                        <Text>Save</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </Form>
            </Container>
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