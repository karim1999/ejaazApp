import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ImageBackground, ActivityIndicator } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Button, Toast, ListItem, Left, Right, Radio} from 'native-base';
import AuthTemplate from "../../auth/authTemplate";
import Colors from "../../../constants/colors";
import Server from "../../../constants/config"
import axios from "axios";
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignUp: false,
            name: "",
            email: "",
            password: "",
            type: 1,
            categories:[{
                id:1,
                name:'first category'
            }]
        }
    }
    onRegisterPressed(){
        if(this.state.name == "" || this.state.email == "" || this.state.password == ""){

            Toast.show({
                text: 'Fields cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });

        }else{
            this.setState({
                isSignUp:true
            });

            return axios.post(Server.url+'api/auth/register',{

                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type

            }).then(response => {
                Toast.show({
                    text: 'Register successfully',
                    type: 'success',
                    buttonText: 'Okay'
                });
                this.setState({
                    isSignUp: false
                });
            }).catch(error => {
                let text= "No Internet Connection.";
                if(error.response.status == 400 && error.response.data && error.response.data.type == "validation" && error.response.data.error){
                    if(error.response.data.error.name){
                        text= error.response.data.error.name[0];
                    }else if(error.response.data.error.email){
                        text= error.response.data.error.email[0];
                    }
                }
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
                this.setState({
                    isSignUp: false
                });
            });
        }
    }
    componentDidMount(){
        // Imprtant Read it --------------------------------->
        /*
        (here we use fetch function to get data from server and we set it into
        state via function called setState
        and we have constant for the server imported
        use it  : server.url
      )
        --hint
        please note that hint is created for you to search for the names mentioned here
        and don't always ask project owner make google your best friend
        */
    }
    render() {
        return (
            <AuthTemplate>
                <Form>
                    <Image source={require("../../../images/Logosampletwo.png")} style={{height: 200, width: 200,alignSelf: 'center', }}/>
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Name" placeholderTextColor="#fff"
                               onChangeText={(val) => this.setState({name: val})}/>
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Email" placeholderTextColor="#fff"
                               onChangeText={(val) => this.setState({email: val})}/>
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.inputText} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true}
                               onChangeText={(val) => this.setState({password: val})}/>
                    </Item>
                    <ListItem
                        style={{height: 70, width: 300, justifyContent: "center", alignItems: "center", alignSelf: "center", borderBottomColor: "transparent"}}
                    >
                        <View
                            style={{width: "50%", height: 70, flex: 1, flexDirection: "row", padding: 10}}
                            onPress={(type) => {this.setState({type: 1})}}
                        >
                            <Left>
                                <Text style={{color: "white"}}>Trainee</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.type === 1}
                                       color="white"
                                       onPress={(type) => {this.setState({type: 1})}}
                                />
                            </Right>
                        </View>
                        <View
                            style={{width: "50%", height: 70, flex: 1, flexDirection: "row", padding: 10}}
                            onPress={(type) => {this.setState({type: 2})}}
                        >
                            <Left>
                                <Text style={{color: "white"}}>Trainer</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.type === 2}
                                       color="white"
                                       onPress={(type) => {this.setState({type: 2})}}
                                />
                            </Right>
                        </View>
                    </ListItem>
                    <Button info style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
                        <Text style={styles.buttonText}> Signup </Text>
                        {this.state.isSignUp && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </Form>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}>
                        <Text style={styles.signupButton}> Sign in</Text>
                    </TouchableOpacity>
                </View>

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
