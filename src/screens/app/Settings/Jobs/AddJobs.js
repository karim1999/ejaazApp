import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import JobsBox from "../../../../components/jobsBox";

export default class AddJobs extends Component {
    constructor(props) {
        super(props);
        let data= {};
        if(this.props.navigation.state.params.isJobs){
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
                start_date: "",
                end_date: "",
                description: "",
            }
        }
        this.state = {
            data: this.props.navigation.state.params,
            isLoading: false,
            jobs: "",
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
            data.append('start_date', this.state.start_date);
            data.append('end_date', this.state.end_date);
            data.append('description', this.state.description);
            if(this.state.data.isJobs){
                data.append('id', this.state.data.id);
                return axios.post(Server.url + 'api/editJobs/'+this.state.data.jobs_id+'?token='+userToken, data).then(response => {
                    this.setState({
                        isLoading: false,
                    });
                    this.props.navigation.navigate("Jobs");
                    Toast.show({
                        text: "Jobs was edited successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                }).catch(error => {
                    alert(error)
                })

            } else {
                return axios.post(Server.url + 'api/addJobs?token='+userToken, data).then(response => {
                    Toast.show({
                        text: "Jobs was added successfully",
                        buttonText: "Ok",
                        type: "success"
                    });
                    this.props.navigation.navigate("Jobs");
                }).catch(error => {
                    alert("karim")
                })
            }

        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    deleteJobs(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this jobs after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/jobs/'+this.state.data.jobs_id+'?token='+userToken).then(response => {
                                this.props.navigation.navigate("Jobs");
                                this.setState({
                                    isDeleting: false,
                                });
                                Toast.show({
                                    text: "The jobs was deleted successfully",
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
                    (this.state.data.isJobs)&& (
                        <Button
                            danger
                            onPress={() => this.deleteJobs()}
                            style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Delete Jobs </Text>
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
                            placeholder="Name of your job...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='institution' />
                        <Label>institution</Label>
                        <Input onChangeText={(institution) => this.setState({institution})}
                            value={this.state.institution}
                            placeholder="institution of your job...."
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