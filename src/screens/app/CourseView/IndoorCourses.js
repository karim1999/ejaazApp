'use strict';

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Container, Item, Label, Icon, Toast, Thumbnail, CardItem, Left, Body, Right, Button} from 'native-base';
import axios from "axios/index";
import Server from "../../../constants/config";
import Color from "../../../constants/colors";
import AppTemplate from "../appTemplate";

export default class IndoorCourses extends Component {
    constructor(props){
        super(props);
        this.state={
            course: this.props.navigation.state.params,
        }
    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="indoor course">
                <View style={styles.all}>
                    <View style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='pencil' />
                        <Text>Course name: </Text>
                        <Label> {this.state.course.title} </Label>
                    </Item>
                   <Item style={{height: 70}}>
                        <Icon type="MaterialCommunityIcons" name='houzz' />
                        <Text>Center name: </Text>
                        <Label> {this.state.course.center} </Label>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="Entypo" name='address' />
                        <Text>Address: </Text>
                        <Label> {this.state.course.address} </Label>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='hourglass-start' />
                        <Text>start: </Text>
                        <Label> {new Date(this.state.course.date_start).toDateString()} </Label>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='dollar' />
                        <Text>Price: </Text>
                        <Label> {this.state.course.price} </Label>
                    </Item>
                    </View>
                </View>
            </AppTemplate>
            
        );
    }
}


var styles = StyleSheet.create({
    all:{
        padding:20,
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
});