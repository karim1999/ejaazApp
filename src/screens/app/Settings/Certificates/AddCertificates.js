import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast, Form, Label, Textarea} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";

export default class AddCertificates extends Component {
    constructor(props) {
        super(props);
        let data= {};
        if(this.props.navigation.state.params.isCertificates){
            data= {
                name: this.props.navigation.state.params.name,
                from: this.props.navigation.state.params.from,
                received_date: this.props.navigation.state.params.received_date,
                description: this.props.navigation.state.params.description,
            }
        }else{
            data= {
                name: "",
                from: "",
                received_date: "",
                description: "",
            }
        }
        this.state = {
            data: this.props.navigation.state.params,
            isLoading: false,
            certificates: "",
            ...data,
            isDeleting: false
        };
    }
    
    addOrEdit(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            let data = new FormData();
            if(this.state.data.isCertificates){
                data.append('id', this.state.data.id);
            }
            data.append('name', this.state.name);
            data.append('institution', this.state.institution);
            data.append('start_date', this.state.start_date);
            data.append('end_date', this.state.end_date);
            data.append('description', this.state.description);
            return axios.post(Server.url + 'api/addCertificates?token='+userToken, data).then(response => {
                this.setState({
                    isLoading: false,
                });
                if(this.state.data.isCertificates){
                    Toast.show({
                        text: "Certificates was edited successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }{
                    Toast.show({
                        text: "Certificates was added successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }

                this.props.navigation.navigate("Certificates", {...this.state.data});
            }).catch(error => {
                alert(error.data)
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }
    deleteCertificates(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this certificates after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/Certificates/'+this.state.data.certificates_id+'?token='+userToken).then(response => {
                                this.props.navigation.navigate("Certificates", {...this.state.data});
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "The certificates was deleted successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "Unknown error hs occurred",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Add Course">
                {
                    (this.state.data.isCertificates)&& (
                        <Button
                            danger
                            onPress={() => this.deleteCertificates()}
                            style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Delete Certificates </Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon name="delete" type="MaterialCommunityIcons" style={{color: "#FFFFFF", fontSize: 25}}/>
                        </Button>
                    )
                }
                <View style={styles.all}>
                    <Form style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='pencil' />
                        <Label>Title</Label>
                        <Input onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder="Name of your certificates...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                   <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='institution' />
                        <Label>institution</Label>
                        <Input onChangeText={(institution) => this.setState({institution})}
                            keyboardType='numeric' placeholder="institution of your certificates...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='hourglass' />
                        <Label>Received_date</Label>
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
                            onDateChange={(val) => this.setState({received_date: val})}
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
                            placeholder="Write more about the course"
                            placeholderTextColor="#ccc5c5"
                            value={this.state.description}
                        />
                    </Item>
                    <Button
                        onPress={() => this.addOrEdit()}
                        style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                        block light>
                        <Text>Save</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                    </Form>
                </View>
            </AppTemplate>
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
        flex: 1,
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