import React, { Component } from 'react';
import {StyleSheet, View, Image, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator,Linking} from 'react-native';
import {Button, Container, Content, Header, Text, Toast} from 'native-base';
import AppTemplate from "../appTemplate";
import Color from "../../../constants/colors";
import {setCart, setUser} from "../../../reducers";
import {connect} from "react-redux";
import CoursBox from "../../../components/courseBox"
import Hr from "react-native-hr-component";
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";


class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            isBuying: false,
            isConnected:null,
        }
    }
    removeFromCart(id){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.delete(Server.url+'api/cart/'+id+'?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                });
                this.props.setCart(response.data);
            }).catch(error => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "Error reaching the server.",
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        });
    }

    componentDidMount(){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            axios.get(Server.url+'api/buy?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                });
                this.props.setCart(response.data);
            }).catch(error => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "Error reaching the server.",
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        })
    }
        

    // buy(){
    //     this.setState({
    //         isBuying: true
    //     });
    //     AsyncStorage.getItem('token').then(userToken => {
    //         return axios.post(Server.url+'api/buy?token='+userToken).then(response => {
    //             this.props.setUser(response.data.user);
    //             Toast.show({
    //                 text: "You can now access your courses.",
    //                 buttonText: "Ok",
    //                 type: "success"
    //             })
    //         }).catch(error => {
    //             Toast.show({
    //                 text: "Error reaching the server.",
    //                 buttonText: "Ok",
    //                 type: "danger"
    //             })
    //         }).then(() => {
    //             this.setState({
    //                 isBuying: false,
    //             });
    //         })
    //     });
    // }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Cart">
                        <Text style={styles.containTxt}>Courses in cart</Text>
                        {
                            (this.state.isLoading)? (
                                <View>
                                    <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                                </View>
                            ): (
                                <FlatList
                                    ListEmptyComponent={
                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", marginTop: 10}}>Add courses to your cart first</Text>
                                    }
                                    data={this.props.user.cart}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name})}>
                                            <CoursBox cart removeFromCart={() => this.removeFromCart(item.id)} {...item} user_name={item.user.name} />
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                            )
                        }
                        {
                            !_.isEmpty(this.props.user.cart) && (
                                <Button
                                    onPress={() => this.props.navigation.navigate('WeebVieew')}
                                    style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                                    block success
                                >
                                    <Text>Buy</Text>
                                    {this.state.isBuying && (
                                        <ActivityIndicator size="small" color="#000000" />
                                    )}
                                </Button>
                            )
                        }
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1'
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    containTxt:{
        backgroundColor: '#6483f7',
        padding: 10,
        marginTop: 15,
        color: '#fff',
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 130,
    },
    content:{
        flexDirection: 'row',
    },
    contentDet1:{
        width:'40%',
        height: 90
    },
    image:{
        marginTop: 10,
        marginLeft: 20,
        width: null,
        flex: 1,
        borderRadius: 5
    },
    contentDet2:{
        width: '60%',
        marginLeft: 20,
        marginTop: 5,
    },
    trainer:{
        color: '#9b9b9b',
    },
    price:{
        alignSelf: 'flex-end',
        marginRight: 60,
    },
    priceText:{
        backgroundColor:'#ebebec',
        color: '#000',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    priceIcon:{
        backgroundColor:'#cab4b4',
        color: '#fff',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
});
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setCart,
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);