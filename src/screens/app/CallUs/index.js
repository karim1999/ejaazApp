'use strict';

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Container, Item, Label, Icon, Button, Toast} from 'native-base';
import AppTemplate from "../appTemplate";
import Server from "../../../constants/config"
import axios from "axios";
import Color from "../../../constants/colors";

export default class CallUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            callus:[],
        }
    }

    componentDidMount(){
        this.setState({isLoading:true});
        return axios.get(Server.url+'api/callus')
        .then(response => {
            this.setState({
                isLoading: false,
                callus: response.data
            });
        }).catch(error => {
            this.setState({
                isLoading: false,
            });
            Toast.show({
                text: "Error reaching the server.",
                buttonText: "Ok",
                type: "danger"
            })
        })
    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Call us">
            {
                (this.state.isLoading)? (
                    <View>
                        <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                    </View>
                ):(
                    <FlatList
                        ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No one applied for this course</Text>
                                }
                        data={this.state.callus}
                        renderItem={({item}) => (
                                <View style={styles.all}>
                                    <View style={styles.container}>
                                        <Item style={{height: 70}}>
                                            <Icon type="Entypo" name='facebook' />
                                            <Text>Facebook link </Text>
                                            <Label> {item.facebook} </Label>
                                        </Item>
                                        <Item style={{height: 70}}>
                                            <Icon type="Entypo" name='twitter' />
                                            <Text>Twitter link </Text>
                                            <Label> {item.twitter} </Label>
                                        </Item>
                                        <Item style={{height: 70}}>
                                            <Icon type="Entypo" name='instagram' />
                                            <Text>Instagram link </Text>
                                            <Label> {item.instgram} </Label>
                                        </Item>
                                        <Item style={{height: 70}}>
                                            <Icon type="FontAwesome" name='mobile-phone' />
                                            <Text>Phone number </Text>
                                            <Label> {item.phone} </Label>
                                        </Item>
                                        <Item style={{height: 70}}>
                                            <Icon type="Entypo" name='address' />
                                            <Text>Address </Text>
                                            <Label>} {item.address} </Label>
                                        </Item>
                                    </View>
                                </View>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />
                )
            }
                
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
});