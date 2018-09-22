import React, { Component } from 'react';
import {StyleSheet, View, Image, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator,WebView } from 'react-native';
import {Button, Container, Content, Header, Text, Toast} from 'native-base';
import AppTemplate from "../appTemplate";
import Color from "../../../constants/colors";
import {setCart, setUser} from "../../../reducers";
import {connect} from "react-redux";
import CoursBox from "../../../components/courseBox"
import Hr from "react-native-hr-component";
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";


export default class WeebVieew extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            Token: '',
            url:Server.url+'api/payment?token=',
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            this.setState({
                Token: userToken,
                isLoading: false
            })
        })
    }
    _onNavigationStateChange(data){
        alert(data.url);
        // alert(data.url);
    }

    render() {
        return (
            <Container style={{flex:1}}>
            {
                (this.state.isLoading)? (
                    <View>
                        <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                    </View>
                ): (
                    <WebView
                       source={{uri: this.state.url + this.state.Token}}
                       onNavigationStateChange={data => this._onNavigationStateChange(data)}
                       style={{marginTop: 20}}
                     />
                )
            }


            </Container>
        );
    }
}
