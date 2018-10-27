import React, { Component } from 'react';
import {Button, Icon, Text, Toast} from 'native-base';
import {AsyncStorage, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Server from "../constants/config";
import _ from "lodash";
import axios from "axios/index";

export default class Course extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.contentDet1}>
                    <Image source={{uri: Server.storage+this.props.img}} style={styles.image}/>
                </View>
                <View style={styles.contentDet2}>
                    {
                        (this.props.cart) && (
                            <TouchableOpacity
                                onPress={() => {this.props.removeFromCart()}}
                                style={{paddingBottom: 0}}>
                                <Icon style={{fontSize: 10}} type="FontAwesome" name="times" />
                            </TouchableOpacity>
                        )
                    }
                    <Text style={styles.contentDet2Txt}>{_.truncate(this.props.title)}</Text>
                    <Text style={styles.trainer}>{this.props.user_name}</Text>
                    <Button transparent style={styles.price}>
                        <Text style={styles.priceText}>{this.props.price}</Text>
                        <Text style={styles.priceIcon}>SAR</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containTxt:{
        backgroundColor: '#6483f7',
        padding: 10,
        marginTop: 15,
        color: '#fff',
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 130,
    },
    content:{
        flexDirection: 'row',
    },
    contentDet1:{
        width:'40%',
        height: 90
    },
    image:{
        marginTop: 10,
        marginLeft: 20,
        width: null,
        flex: 1,
        borderRadius: 5
    },
    contentDet2:{
        width: '60%',
        marginLeft: 20,
        marginTop: 5,
    },
    trainer:{
        color: '#9b9b9b',
    },
    price:{
        alignSelf: 'flex-end',
        marginRight: 60,
    },
    priceText:{
        backgroundColor:'#ebebec',
        color: '#000',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    priceIcon:{
        backgroundColor:'#cab4b4',
        color: '#fff',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
});
