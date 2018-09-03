import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast, Form, Label, Textarea} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import EducationBox from "../../../../components/educationBox"

export default class AddEducation extends Component {
    constructor(props) {
        super(props);
        let data= {};
        if(this.props.navigation.state.params.isEducation){
            data= {
                name: this.props.navigation.state.params.name,
                institution: this.props.navigation.state.params.institution,
                start_date: this.props.navigation.state.params.start_date,
                end_date: this.props.navigation.state.params.end_date,
                description: this.props.navigation.state.params.description,
            }
        }else{
            data= {
                name: "",
                institution: "",
                start_date: "09/30/2018",
                end_date: "09/30/2018",
                description: "",
            }
        }
        this.state = {
            data: this.props.navigation.state.params,
            isLoading: false,
            education: "",
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
            data.append('name', this.state.name);
            data.append('institution', this.state.institution);
            data.append('start_date', new Date(this.state.start_date).toLocaleDateString('en-GB'));
            data.append('end_date', new Date(this.state.end_date).toLocaleDateString('en-GB'));
            data.append('description', this.state.description);
            if(this.state.data.isEducation){
                data.append('id', this.state.data.id);
                return axios.post(Server.url + 'api/editEducation/'+this.state.data.education_id+'?token='+userToken, data).then(response => {
                    this.props.navigation.navigate("Education");
                    Toast.show({
                        text: "Education was edited successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }).catch(error => {
                    alert(error)
                })

            } else {
                return axios.post(Server.url + 'api/addEducation?token='+userToken, data).then(response => {
                    this.props.navigation.navigate("Education");
                    Toast.show({
                        text: "Education was edited successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }).catch(error => {
                    alert(error)
                })
            }

        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    deleteEducation(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this education after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/education/'+this.state.data.education_id+'?token='+userToken).then(response => {
                                this.props.navigation.navigate("Education");
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "The education was deleted successfully",
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
            <AppTemplate back navigation={this.props.navigation} title="Add/Edit Education">
                <Text>
                    {
                        this.state.name+" , "+this.state.institution+" , "+this.state.description+" , "+new Date(this.state.start_date).toLocaleDateString('en-GB')+" , "+new Date(this.state.end_date).toLocaleDateString('en-GB')
                    }
                </Text>
                {
                    (this.state.data.isEducation)&& (
                        <Button
                            danger
                            onPress={() => this.deleteEducation()}
                            style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Delete Education </Text>
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
                                   placeholder="Name of your education...."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='institution' />
                            <Label>institution</Label>
                            <Input onChangeText={(institution) => this.setState({institution})}
                                   value={this.state.institution}
                                   placeholder="institution of your education...."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='hourglass-start' />
                            <Label>Start_date</Label>
                            <DatePicker
                                defaultDate={new Date(this.state.start_date)}
                                minimumDate={new Date(1990, 1, 1).getTime()}
                                maximumDate={new Date(2018, 12, 31).getTime()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText={new Date(this.state.start_date).toLocaleDateString('en-GB')}
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#cacaca" }}
                                onDateChange={(val) => this.setState({start_date: val})}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='hourglass-end' />
                            <Label>End_date</Label>
                            <DatePicker
                                defaultDate={new Date(this.state.end_date)}
                                minimumDate={new Date(1990, 1, 1).getTime()}
                                maximumDate={new Date(2018, 12, 31).getTime()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText={new Date(this.state.end_date).toLocaleDateString('en-GB')}
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
                            style={{height: 200, paddingTop: 0, marginTop: 0, flex: 1}}
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
