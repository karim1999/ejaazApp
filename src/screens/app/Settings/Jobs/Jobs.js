import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, DatePicker, Toast,} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import Color from "../../../../constants/colors";

export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            isLoading: false,
            cloneJobs: [],
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

    _onLoad(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken=>{
            return axios.get(Server.url + 'api/user/jobs?token=' + userToken)
            .then(response=>{
                this.setState({
                    isLoading:false,
                    cloneJobs: response.data,
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
        })
    }
    async componentDidMount(){
        await this._onLoad();
    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Jobs">
                <Button
                    dark
                    onPress={() => this.props.navigation.navigate("AddJobs", {isJobs: false})}
                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Add Jobs </Text>
                    {this.state.isLoading && (
                        <ActivityIndicator size="small" color="#000000" />
                    )}
                    <Icon name="ios-add-circle" style={{color: "#FFFFFF", fontSize: 25}}/>
                </Button>
                <View style={styles.container}>
                {
                    (this.state.isLoading)? (
                        <View>
                            <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                        </View>
                    ): (
                        <View>
                            <FlatList
                                ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No Jobs were found</Text>
                                }
                                data={this.state.cloneJobs}
                                renderItem={({item}) => (
                                    <Item style={{height: 90, flexDirection: 'row', padding: 5}}
                                            onPress={() => this.props.navigation.navigate("AddJobs", {...item, isJobs: true, jobs_id: item.id})}
                                    >
                                    <Icon type="Foundation" name='shopping-bag' style={{padding: 5}}/>
                                        <View style={{paddingLeft: 20}}>
                                            <Label>{item.name}</Label>
                                            <Text>{item.institution}</Text>
                                        </View>
                                        <View style={{position: 'absolute', right: 10}}>
                                        <Text note>{item.start_date}</Text>
                                        <Text note>{item.end_date}</Text>
                                        </View>
                                    </Item>

                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
                        </View>
                    )
                    }

                </View>
            </AppTemplate> 
        );
    }
}

const styles = StyleSheet.create({
    all: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        height: '100%',
        flex: 1,
        flexDirection: "row"
    },
    container: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fff',
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