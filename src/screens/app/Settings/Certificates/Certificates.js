import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";

export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state =
        { 
            chosenDate: new Date(),
            isLoading: false,
            name: "",
            from: "",
            description: "",
            received_date: 0,
        };

        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

       onCertificatesPressed(){

        if(this.state.name == "" || this.state.from == "" || this.state.description == "" || this.state.received_date == "")
        {
            Toast.show({
                text: 'Please fill out fields.',
                type: "danger",
                buttonText: 'Okay'
            });

        }else {

            this.setState({
                isLoading: true
            });
            return AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url + 'api/addCertificates?token='+userToken, {
                    name: this.state.name,
                    from: this.state.from,
                    description: this.state.description,
                    received_date: new Date(this.state.received_date).toLocaleDateString(),
                }).then(response => {
                    Toast.show({
                        text: 'Successfully',
                        type: "success",
                        buttonText: 'Okay'
                    });
                    this.setState({
                        isLoading: false
                    });
                }).catch(error => {
                    Toast.show({
                        text: 'Error.',
                        type: "danger",
                        buttonText: 'Okay'
                    });
                    this.setState({
                        isLoading: false
                    });
                });
            });
        }

    }

    render() {
        return (
        <AppTemplate back navigation={this.props.navigation} title="Certificates">
            <Container style={styles.all}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Name</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholder="Name of your certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({name: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>from</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} keyboardType='numeric' placeholder="from of your certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({from: val})}/>
                        </Item>
                    </View>
                    <View style={styles.contentDescription}>
                        <Text style={styles.contentTxt}>Description</Text>
                        <Item regular style={styles.inputDescription}>
                            <Input style={styles.inputText} placeholder="Description of your certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({description: val})}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>received_date</Text>
                        <View style={styles.date}>
                            <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(1990, 1, 1)}
                            maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#cacaca" }}
                            onDateChange={(val) => this.setState({received_date: val})}
                            />
                            {/* <Text>
                            Date: {this.state.chosenDate.toString().substr(4, 12)}
                            </Text> */}
                        </View>                        
                    </View>
                    <Button info style={styles.button} onPress={this.onCertificatesPressed.bind(this)}>
                        <Text style={styles.buttonText}> Submit </Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </View>
            </Container>
        </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        width: 370,
        height: 350,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20
    },
    content:{
        flexDirection: 'row',
        marginBottom:25,
    },
    contentDescription:{
        flexDirection: 'row',
        height: 60,
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
        width: 200,
        padding: 10,
        height:70,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{  
        position: 'absolute',
        right: 15,
    },
    button:{
        backgroundColor: '#6483f7',
        position: 'absolute',
        right: 20, 
        bottom: 10
    },
});