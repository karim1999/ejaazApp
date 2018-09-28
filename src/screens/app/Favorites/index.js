import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, } from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import _ from "lodash";

class Favorites extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            cloneFavorites:[]
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/user/favorites?token='+userToken).then(response => {
                this.setState({
                    isLoading:false,
                    cloneFavorites: response.data
                });
            }).catch(error => {
                alert(error.data)
            })
        })
    }
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Favorites">
                        <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Please add courses to favorites first</Text>
                            }
                            data={this.props.user.favorites}
                            renderItem={({item}) => (

                                <View style={styles.container}>
                                <TouchableOpacity
                                     onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name,user_img: item.user.img})}>
                                    <ImageBackground source={{uri: Server.storage+item.img}} style={styles.image}>
                                        <View style={styles.viewContent}>
                                            <Text style={styles.viewContentTxt}>{_.truncate(item.title)}</Text>
                                            <Text style={styles.viewContentText}>{item.user.name}</Text>
                                            <View style={styles.viewContentStar}>
                                                <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                                <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                                <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                                <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                                <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                            </View>
                                            <Button transparent style={styles.footer}>
                                                <Text style={styles.footerText}>{item.price}</Text>
                                                <Text style={styles.footerIcon}>$</Text>
                                            </Button>
                                        </View>
                                    </ImageBackground>
                                    </TouchableOpacity>
                                </View>

                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:10
    },
    image:{
        height: 150,
        width: null,
        borderRadius:15,
        overflow: "hidden",
    },
    viewContent:{
        position:'absolute',
        backgroundColor: 'rgba(100,131,247,0.5)',
        height: '100%',
        padding: 8,
        paddingTop: 10,
        width: '35%',
    },
    viewContentTxt:{
        color: '#fff',
    },
    viewContentText:{
        color: '#fff',
        fontSize: 11
    },
    viewContentStar:{
        flexDirection: 'row',
    },
    star:{
        color: '#b8d533',
        fontSize: 17
    },
    footer:{
        alignSelf:'center'
    },
    footerText:{
        backgroundColor:'#ebebec',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        fontSize: 10,
    },
    footerIcon:{
        backgroundColor:'#cbb6b6',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        fontSize: 10,
    }

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
)(Favorites);