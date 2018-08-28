import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import EducationBox from "../../../../components/educationBox"

export default class ShowEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            isLoading: false,
            cloneEducation: [],
        };
    }

    componentDidMount(){
        return AsyncStorage.getItem('token').then(userToken=>{
            return axios.get(Server.url + 'api/user/education?token=' + userToken)
            .then(response=>{
                this.setState({
                    isLoading:false,
                    cloneEducation: response.data,
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

    onEducationPressed(id,name,institution,description,start_date,end_date){

        return AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url + 'api/editEducation/'+id+'?token='+userToken, {
                name,
                institution,
                description,
                start_date: new Date(start_date).toLocaleDateString(),
                end_date: new Date(end_date).toLocaleDateString(),
            }).then(response => {
                Toast.show({
                    text: 'Successfully',
                    type: "success",
                    buttonText: 'Okay'
                });
                this.setState({
                    isLoading: false
                });
            }).catch(error => {
                Toast.show({
                    text: 'Error.',
                    type: "danger",
                    buttonText: 'Okay'
                });
                this.setState({
                    isLoading: false
                });
            });
        });
    }

    removeFromCart(id){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.delete(Server.url+'api/education/'+id+'?token='+userToken).then(response => {
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

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Education">
                        <View style={styles.container}>
                        <TouchableOpacity
                                onPress={() => {this.props.removeFromCart()}}
                                style={{paddingBottom: 0}}>
                                <Icon style={{fontSize: 10}} type="FontAwesome" name="times" />
                            </TouchableOpacity>
                    <FlatList
                        ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Please add Your education first</Text>
                            }
                    data={this.state.cloneEducation}
                    renderItem={({item}) => (
                            <EducationBox removeFromCart={() => this.removeFromCart(item.id)} 
                            onEducationPressed={() => 
                            this.onEducationPressed(item.id,item.name,item.institution,item.description,item.start_date,item.end_date)} {...item}/>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                    />
                        </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20
    },
    content:{
        flexDirection: 'row',
        marginBottom:25,
    },
    contentDescription:{
        flexDirection: 'row',
        height: 60,
        marginBottom:25,
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
        width: 200,
        padding: 10,
        height:70,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
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
    },
});
