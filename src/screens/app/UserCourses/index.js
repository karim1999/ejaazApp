import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, Text, H2 } from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import Course from "../../../components/course";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";

class UserCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="My courses">
                <FlatList
                ListEmptyComponent={
                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No courses were found</Text>
                }
                    data={this.props.user.jointcourses}
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
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCourses);