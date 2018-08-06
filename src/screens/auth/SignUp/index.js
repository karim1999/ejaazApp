import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ImageBackground } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Button} from 'native-base';
import AuthTemplate from "../../auth/authTemplate";
import Colors from "../../../constants/colors";
import Server from "../../../constants/config"
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            password:"",
            password_confirmation:"",
            errors:[],
            categories:[{
                id:1,
                name:'first category'
            }]
        }
    }
    async onRegisterPressed(){
        try{
            let response = await fetch(Server.url+'api/auth/register',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,

                })
            });

            let res = await response.text();
            console.warn("res is "+ res);
        }catch(errors){

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
                <Container style={styles.container}>
                    <ImageBackground source={require('../../../images/Background.png')} style={{height: '100%', width: '100%', }}>
                        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                            <Form>
                                <Image source={require("../../../images/Logosampletwo.png")} style={{height: 200, width: 200,alignSelf: 'center', }}/>
                                <Item rounded style={styles.input}>
                                    <Input style={styles.inputText} placeholder="Username" placeholderTextColor="#fff"
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
                                <Item rounded style={styles.input}>
                                    <Input style={styles.inputText} placeholder="Confirm password" placeholderTextColor="#fff" secureTextEntry={true}
                                    onChangeText={(val) => this.setState({password_confirmation: val})}/>
                                </Item>
                                <Button info style={styles.button} onPress={this.onRegisterPressed.bind(this)}><Text style={styles.buttonText}> Signup </Text></Button>
                            </Form>
                            <View style={styles.signupTextCont}>
                                <Text style={styles.signupText}>Already have an account?</Text>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}>
                                    <Text style={styles.signupButton}> Sign in</Text>
                                </TouchableOpacity>
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>
            </AuthTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
