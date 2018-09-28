import React, { Component } from 'react';
import {FlatList, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {Text} from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import Course from "../../../components/course";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import CourseBox from "../../../components/courseBox";
import _ from "lodash";
import Color from "../../../constants/colors";

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
                        // (_.find(this.props.user.jointcourses, course => course.id == item.id &&  course.pivot.status == 1))?
                        // (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name,user_img: item.user.img})}>
                            <CourseBox {...item} user_name={item.user.name} />
                        </TouchableOpacity>
                        // ):
                        // (
                        //     <Text></Text>
                        // )
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