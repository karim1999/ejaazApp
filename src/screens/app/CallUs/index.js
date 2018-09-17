'use strict';

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Container, Item, Label, Icon, Button} from 'native-base';
import AppTemplate from "../appTemplate";

export default class CallUs extends Component {
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Call us">
                <View style={styles.all}>
                    <View style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="Entypo" name='facebook' />
                        <Label>Facebook link</Label>
                        <Text></Text>
                    </Item>
                   <Item style={{height: 70}}>
                        <Icon type="Entypo" name='twitter' />
                        <Label>Twitter link</Label>
                        <Text></Text>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="Entypo" name='instagram' />
                        <Label>Instagram link</Label>
                        <Text></Text>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='mobile-phone' />
                        <Label>Phone number</Label>
                        <Text></Text>
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="Entypo" name='address' />
                        <Label>Address</Label>
                        <Text></Text>
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