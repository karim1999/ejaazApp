import React, { Component } from 'react';
import { StyleSheet, Image, View, TextInput, ActivityIndicator, } from 'react-native';
import { Container, Content, Form, Item, Button, Icon, Text, Body, H2, Input, Tabs, } from 'native-base';
import Server from "../../../constants/config"
import {removeUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios"

class Education extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLogout: false,
        }
    }

    onLogoutPressed(){

        return axios.post(Server.url + 'api/auth/logout')
        .then(response=>{
            this.props.removeUser();
            this.props.removeItemValue(response.data.access_token);
            this.props.navigation.navigate('SignIn');
        })

        
    }

    async removeItemValue(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
      }

    render() {
        return (

                <Button info style={styles.button} onPress={this.onLogoutPressed.bind(this)}>
                    <Text style={styles.buttonText}> Logout </Text>
                </Button>
        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    removeUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Education);