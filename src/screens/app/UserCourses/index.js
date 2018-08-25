import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, Text, H2 } from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import Course from "../../../components/course";

export default class UserCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            cloneUserCourses:[]
        }
    }

    componentDidMount(){
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/usercourses?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                    cloneUserCourses: response.data
                });
            }).catch(error => {
                alert(error.data)
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="courses">
                <FlatList 
                    data={this.state.cloneUserCourses}
                    renderItem={({item}) => (
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name})}>
                        <Course {...item} user_name={item.user.name} />
                    </TouchableOpacity>
                    )}
            
                    keyExtractor = { (item, index) => index.toString() }
                />
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
});