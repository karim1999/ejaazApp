import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, } from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, } from 'native-base';
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
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Last password</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} secureTextEntry={true} placeholder="Enter previous pass..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({Name: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>New password</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} secureTextEntry={true} keyboardType='numeric' placeholder="Enter new pass..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Confirm password</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} secureTextEntry={true} placeholder="Confirm pass..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <Button info style={styles.button} >
                        <Text style={styles.buttonText}> Submit </Text>
                        {this.state.isCommented && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        width: 370,
        height: 260,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        paddingTop: 30
    },
    content:{
        flexDirection: 'row',
        marginBottom:35,
    },
    input:{
        width: 200,
        padding: 10,
        height:40,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
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