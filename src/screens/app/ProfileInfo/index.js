import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, FlatList, ActivityIndicator} from 'react-native';
import { Container, Content, Text, Button, Icon, H3, Toast, Thumbnail, ListItem, Left, Body, } from 'native-base';
import Hr from "react-native-hr-component";
import AppTemplate from "../appTemplate";
import Server from "../../../constants/config";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import axios from "axios";
import Color from "../../../constants/colors";
import _ from "lodash";

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: true,
            profile:this.props.navigation.state.params,
            profileData: [],
        };
      }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url+'api/auth/profile/'+this.state.profile.user_id+'?token='+userToken).then(response => {
                this.setState({
                    profileData: response.data,
                });
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    createRating(rate){
        let i;
        let stars= [];
        for(i =0; i< rate; i++ ){
            stars.push(<Icon key={i} active style={styles.star} type="MaterialCommunityIcons" name="star" />);
        }
        for(i; i<5; i++){
            stars.push(<Icon key={i} active style={styles.star2} type="MaterialCommunityIcons" name="star" />);
        }
        return stars;
    }
    
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Profile info">
            {
                (this.state.isLoading)? (
                    <View>
                        <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                    </View>
                ): (
                    
                <View style={styles.all}>
                        <View style={styles.container}>
                            <View style={styles.trainer}>
                                <H3 style={styles.trainerH3}>{this.state.profileData.user.name}</H3>
                                <H3 style={styles.trainerH3}>UI Trainer</H3>
                            </View>
                            <View style={styles.content}>

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Joined</H3>
                                    <Text style={styles.titleName}>{this.state.profileData.user.created_at}</Text>
                                </View>

                                <FlatList
                                data={this.state.profileData.user.education}
                                renderItem={({item}) => (
                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Education</H3>
                                    <Text style={styles.titleNameMajor}>{item.name}</Text>
                                </View>
                                
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />

                                <FlatList
                                data={this.state.profileData.user.jobs}
                                renderItem={({item}) => (
                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Major</H3>
                                    <Text style={styles.titleNameMajor}>{item.name}</Text>
                                </View>
                                
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />

                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Courses</H3>
                                    <Text style={styles.titleName}>5</Text>
                                    <H3 style={styles.titleCertify}>Certified</H3>
                                    <Image source={require("../../../images/checkmark-blue.png")} style={styles.imageCertify}/>
                                </View>

                                <FlatList
                                data={this.state.profileData.user.certificates}
                                renderItem={({item}) => (
                                <View style={styles.contentUniversty}>
                                    <H3 style={styles.title}>Experience</H3>
                                    <Text style={styles.titleNameMajor}>{item.from} Years in {item.name}</Text>
                                </View>
                                
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                                
                                <View style={styles.contentReview}>
                                    <H3 style={styles.title}>Reviws</H3>
                                    
                                <FlatList
                                ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No reviews were found</Text>
                                }
                                data={_.reverse(this.state.profileData.user.reviews)}
                                renderItem={({item}) => (
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={{uri: Server.storage+item.user.img}} />
                                        </Left>
                                        <Body>
                                        <Text>{item.user.name}</Text>
                                        <View style={styles.viewContentStar}>
                                            {
                                                this.createRating(item.rate)
                                            }
                                        </View>
                                        <Text note>{item.review}</Text>
                                        </Body>
                                    </ListItem>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
                                </View>
                            </View>
                        </View>
                            <Image source={require("../../../images/6onq25y0sh311.jpg")} style={styles.image}/>

                </View>
                    
                )
            }
                
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
        height: 1000,
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
    viewContentStar:{
        flexDirection: 'row',
    },
    star:{
        color: '#b8d533',
        fontSize: 17
    },
    star2:{
        color: '#d7d7d7',
        fontSize: 17
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