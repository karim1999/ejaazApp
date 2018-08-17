import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ImageBackground, ActivityIndicator } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Button, Toast} from 'native-base';
import AuthTemplate from "../../auth/authTemplate";
import Colors from "../../../constants/colors";
import Server from "../../../constants/config"
import axios from "axios";
export default class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
           isResetPassword: false,
           email: "",
            categories:[{
                id:1,
                name:'first category'
            }]
        }
    }
    onResetPasswordPressed(){
        if(this.state.email == ""){
            
            Toast.show({
                text: 'email cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });
        
        }else{
             this.setState({
                isResetPassword:true
            });

        return axios.post(Server.url+'api/auth/password/reset',{

            email: this.state.email
            
        }).then(response => {
            Toast.show({
                text: 'A reset email has been sent! Please check your email.',
                type: 'success',
                buttonText: 'Okay'
            });
            this.setState({
                isResetPassword: false
            });
        }).catch(error => {
            let text= "No Internet Connection.";
            if(error.response.status == 401 && error.response.data.error &&  error.response.data.error.email){
                if(error.response.data.error.email){
                    text= error.response.data.error.email[0];
                }
            }
            Toast.show({
                text,
                type: 'danger',
                buttonText: 'Okay'
            });
            this.setState({
                isResetPassword: false
            });
        });
        }
    }

    render() {
        return (
            <AuthTemplate>
                <Form>
                    <Image 
                    source={require("../../../images/Logosampletwo.png")}
                     style={{height: 200, width: 200,alignSelf: 'center', }}
                    />
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Email" placeholderTextColor="#fff"
                               onChangeText={(val) => this.setState({email: val})}/>
                    </Item>
                    <Button info style={styles.button} onPress={this.onResetPasswordPressed.bind(this)}>
                    <Text style={styles.buttonText}> Send Password Reset Link </Text>
                    {this.state.isResetPassword && (
                        <ActivityIndicator style={{}} size="small" color="#000000" />
                    )}
                    </Button>
                    <TouchableOpacity style={{alignItems: 'center',}} onPress={()=> this.props.navigation.navigate('SignIn')}>
                        <Text style={styles.loginButton}>Back to login?</Text>
                    </TouchableOpacity>
                </Form>

            </AuthTemplate>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        width: 300,
        marginBottom: 10,
        padding: 10,
        height: 40,
        alignSelf: 'center',
    },
    inputText:{
        color: '#fff',
        fontSize: 16
    },
    button:{
        alignSelf: 'center',
        borderRadius: 25,
        paddingLeft: 40,
        paddingRight: 40
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
    loginButton:{
        color:'#367fa9',
        fontSize: 16,
        fontWeight: '500',
    }
});
