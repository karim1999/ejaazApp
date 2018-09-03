import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { Container, Content, Text, Button, Icon, H3, } from 'native-base';
import Hr from "react-native-hr-component";
import AppTemplate from "../appTemplate";
import Server from "../../../constants/config";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import axios from "axios";

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: false,
            name:this.props.user.name,
            created_at:this.props.user.created_at,
            education:this.props.user.education.name,
            jobs:this.props.user.jobs.name,
            certificates:this.props.user.certificates.name,
            phone:this.props.user.phone,
        };
      }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url+'api/auth/me?token='+userToken).then(response => {
                this.props.setUser(response.data.user);
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
        }).then(() => {
            this.setState({
                refreshing: false
            });
        });
    }
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Profile info">
                <View style={styles.all}>
                        <View style={styles.container}>
                            <View style={styles.trainer}>
                                <H3 style={styles.trainerH3}>{this.state.name}</H3>
                                <H3 style={styles.trainerH3}>UI Trainer</H3>
                            </View>
                            <View style={styles.content}>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Joined</H3>
                                    <Text style={styles.titleName}>{new Date(this.state.created_at).toString()}</Text>
                                </View>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Education</H3>
                                    <Text style={styles.titleNameMajor}>{this.state.education}</Text>
                                </View>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Major</H3>
                                    <Text style={styles.titleNameMajor}>{this.state.jobs}</Text>
                                </View>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Courses</H3>
                                    <Text style={styles.titleName}>33</Text>
                                    <H3 style={styles.titleCertify}>Certified</H3>
                                    <Image source={require("../../../images/checkmark-blue.png")} style={styles.imageCertify}/>
                                </View>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Experience</H3>
                                    <Text style={styles.titleName}>5 Years in teaching graphics</Text>
                                </View>
                                
                                <View style={styles.contentReview}>
                                    <H3 style={styles.title}>Reviws</H3>
                                    <View style={styles.reviewComment}>
                                        <Image source={require("../../../images/images.png")} style={styles.imageComment}/>
                                        <Text style={styles.commentName}>Abdelrahman Labib</Text>
                                        <View style={styles.viewContentStarComment}>
                                            <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" /> 
                                            <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" /> 
                                            <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" /> 
                                            <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" /> 
                                            <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" /> 
                                        </View>
                                    </View>
                                    <Text style={styles.commentText}>Lsdasdasdsdsdasd</Text>
                                </View>
                            </View>
                        </View>
                            <Image source={require("../../../images/6onq25y0sh311.jpg")} style={styles.image}/>

              </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        backgroundColor: '#f5f5f5',
        padding:15,
        paddingTop: 150
    },
    container:{
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: '100%',
        height: 550,
    },
    image:{
      height: 200, 
      width: 200, 
      flex: 1,
      borderRadius: 100,
      position: 'absolute',
      top: 25,
      alignSelf: 'center'
    },
    trainer:{
        position: 'absolute',
        top: 85,
        alignSelf: 'center'
    },
    trainerH3:{
        alignSelf: 'center'
    },
    content:{
        position: 'absolute',
        top: 140,
    },
    contentUniversty:{
        flexDirection: 'row',
        padding: 10
    },
    title:{
        color: '#fff',
        backgroundColor: '#9da1a4',
        padding: 10,
        borderRadius: 6
    },
    titleName:{
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#272727',
        padding: 12,
        borderRadius: 6,
        fontSize: 16,
        color: '#272727'
    },
    titleNameMajor:{
        color: '#fff',
        backgroundColor: '#6483f7',
        padding: 10,
        marginLeft: 10,
        borderRadius: 6,
        fontSize: 16,
        color: '#272727'
    },
    titleCertify:{
        color: '#fff',
        backgroundColor: '#9da1a4',
        borderRadius: 6,
        padding: 10,
        marginLeft: 15
    },
    imageCertify:{
        height: 40,
        width: 40,
        marginLeft: 10,
    },
    contentReview:{
        padding: 10
    },
    reviewComment:{
      flexDirection: 'row',
      paddingTop: 10,
    },
    imageComment:{
      width: 30,
      height: 30,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#e5e5e5',
    },
    viewContentStarComment:{
      flexDirection: 'row',
      position: 'absolute',
      right: 25,
      bottom: 5
    },
    starComment:{
      color: '#b8d533',
      fontSize: 15,
    },
    commentName:{
      paddingLeft: 10,
      paddingTop: 5
    },
    commentText:{
      paddingTop: 5
    },
});

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileInfo);