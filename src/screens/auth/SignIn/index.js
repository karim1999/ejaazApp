import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ImageBackground, ActivityIndicator, AsyncStorage } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Button, Toast} from 'native-base';
import AuthTemplate from "../../auth/authTemplate";
import Colors from "../../../constants/colors";
import Server from "../../../constants/config"
import axios from "axios";
import {setUser, setCategories} from "../../../reducers";
import {connect} from "react-redux";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSigningIn: false,
            email: "",
            password: "",
            categories:[{
                id:1,
                name:'first category'
            }]
        }
    }

    onLoginPressed(){

        if(this.state.email == "" || this.state.password == ""){

            Toast.show({
                text: 'Email and password cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });

        }else {

            this.setState({
                isSigningIn: true
            });

            return axios.post(Server.url + 'api/auth/login', {
                email: this.state.email,
                password: this.state.password,
            }).then(response => {
                this.props.setUser(response.data.user, response.data.access_token);
                this.props.setCategories(response.data.categories);
                let item= this.storeItem('token', response.data.access_token);
                Toast.show({
                    text: 'Logged in successfully',
                    type: "success",
                    buttonText: 'Okay'
                });
                this.props.navigation.navigate('App');
                this.setState({
                    isSigningIn: false
                });
            }).catch(error => {
                Toast.show({
                    text: 'Wrong email or password.',
                    type: "danger",
                    buttonText: 'Okay'
                });
                this.setState({
                    isSigningIn: false
                });
            });

        }

    }
    async storeItem(key, item) {
        try {
            let jsonOfItem = await AsyncStorage.setItem(key, item);
            return jsonOfItem;
        } catch (error) {
            console.log(error.message);
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <AuthTemplate>

                <Form>
                    <Image source={require("../../../images/Logosampletwo.png")} style={{height: 200, width: 200,alignSelf: 'center', }}/>
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Email" placeholderTextColor="#fff"
                               onChangeText={(val) => this.setState({email: val})}/>
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Password" placeholderTextColor="#fff"
                               onChangeText={(val) => this.setState({password: val})} secureTextEntry={true}/>
                    </Item>
                    <Button info style={styles.button} onPress={this.onLoginPressed.bind(this)}>
                        <Text style={styles.buttonText}> Login </Text>
                        {this.state.isSigningIn && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </Form>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')}>
                        <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{alignItems: 'center',}} onPress={()=> this.props.navigation.navigate('ResetPassword')}>
                        <Text style={styles.signupButton}> Forgot Your Password? </Text>
                    </TouchableOpacity>
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
    signupTextCont:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText:{
        color:'#999',
        fontSize: 16
    },
    signupButton:{
        color:'#367fa9',
        fontSize: 16,
        fontWeight: '500',
    }

});
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser,
    setCategories
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);