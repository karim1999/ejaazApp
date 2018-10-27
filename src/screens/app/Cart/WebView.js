import React, { Component } from 'react';
import {StyleSheet, View, Image, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator,WebView, Platform } from 'react-native';
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


class WeebVieew extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: true,
            Token: '',
            url:Server.url+'api/payment?token=',
        }
    }

    showSpinner() {
        this.setState({ visible: true });
      }

    hideSpinner() {
        this.setState({ visible: false });
      }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            this.setState({
                Token: userToken,
                isLoading: false,
            })
        })
    }
    _onNavigationStateChange(data){
        var str = data.url
        if(str.includes("status")){
            Toast.show({
                text: "Successfullly buy.",
                buttonText: "Ok",
                type: "success"
            })
            this.props.navigation.navigate('Cart', this.props.setCart());
        }
    }

    render() {
        return (
                  <Container style={{flex:1}}>

                           {this.state.visible && (
                              <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                              )}
                          <WebView
                             source={{uri: this.state.url + this.state.Token}}
                             onLoadStart={() => (this.showSpinner())}
                             onLoad={() => this.hideSpinner()}
                             onNavigationStateChange={data => this._onNavigationStateChange(data)}
                           />
                  </Container>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setCart,
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeebVieew);
