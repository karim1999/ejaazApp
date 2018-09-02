import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage} from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, DatePicker, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";

export default class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            isLoading: false,
            name: "",
            institution: "",
            description: "",
            start_date: 0,
            end_date: 0
        };
        // this.setDate = this.setDate.bind(this);
    }
    // setDate(newDate) {
    //     this.setState({ chosenDate: newDate });
    // }

    onEducationPressed(){

        if(this.state.name == "" || this.state.institution == "" || this.state.description == "" || this.state.start_date == ""|| this.state.end_date == "")
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
                return axios.post(Server.url + 'api/addEducation?token='+userToken, {
                    name: this.state.name,
                    institution: this.state.institution,
                    description: this.state.description,
                    start_date: new Date(this.state.start_date).toLocaleDateString('en-GB'),
                    end_date: new Date(this.state.end_date).toLocaleDateString('en-GB'),
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
            <Container style={styles.all}>
                <Form style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='pencil' />
                        <Label>Title</Label>
                        <Input onChangeText={(name) => this.setState({name})}
                            placeholder="Name of your education...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='institution' />
                        <Label>institution</Label>
                        <Input onChangeText={(institution) => this.setState({institution})}
                            keyboardType='numeric' placeholder="institution of your education...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='hourglass-start' />
                        <Label>Start_date</Label>
                        <DatePicker
                            defaultDate={new Date().getTime()}
                            minimumDate={new Date(1990, 1, 1).getTime()}
                            maximumDate={new Date(2018, 12, 31).getTime()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#cacaca" }}
                            onDateChange={(val) => this.setState({start_date: val})}
                    />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='hourglass-end' />
                        <Label>End_date</Label>
                        <DatePicker
                            defaultDate={new Date().getTime()}
                            minimumDate={new Date(1990, 1, 1).getTime()}
                            maximumDate={new Date(2018, 12, 31).getTime()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#cacaca" }}
                            onDateChange={(val) => this.setState({end_date: val})}
                    />
                    </Item>
                    <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                        <Icon type="FontAwesome" name='info' />
                        <Text>Description</Text>
                    </Item>
                    <Item style={{marginBottom: 20}}>
                        <Textarea
                            style={{height: 200, paddingTop: 0, marginTop: 0}}
                            style={{flex: 1}}
                            rowSpan={5}
                            bordered
                            onChangeText={(description) => this.setState({description})}
                            placeholder="Write more about your education"
                            placeholderTextColor="#ccc5c5"
                            value={this.state.description}
                        />
                    </Item>
                    <Button
                        onPress={this.onEducationPressed.bind(this)}
                        style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                        block light>
                        <Text>Save</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
    },
    container:{
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
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
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