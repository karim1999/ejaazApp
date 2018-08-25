import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, } from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, } from 'native-base';
import Server from "../../../constants/config"
import {removeUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios"

export default class AddCourse extends Component {
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
                        <Text style={styles.contentTxt}>Course title</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholder="Course title..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({Name: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Number of hours</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} keyboardType='numeric' placeholder="ex:33h..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Budget</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} keyboardType='numeric' placeholder="Budget..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Category</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholder="Category..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Course picture</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({institution: val})}/>
                        </Item>
                    </View>
                    <View style={styles.contentDescription}>
                        <Text style={styles.contentTxt}>Description</Text>
                        <Item regular style={styles.inputDescription}>
                            <Input style={styles.inputText} placeholder="Description..." placeholderTextColor="#ccc5c5"
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
    },
    container:{
        width: 370,
        height: 500,
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