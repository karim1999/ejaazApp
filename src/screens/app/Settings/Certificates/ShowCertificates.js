import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import CertificatesBox from "../../../../components/certificatesBox";

export default class ShowCertificates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            isLoading: false,
            cloneCertificates: [],
        };
        // this.setDate = this.setDate.bind(this);
    }
    // setDate(newDate) {
    //     this.setState({ chosenDate: newDate });
    // }

    componentDidMount(){
        return AsyncStorage.getItem('token').then(userToken=>{
            return axios.get(Server.url + 'api/user/certificates?token=' + userToken)
            .then(response=>{
                this.setState({
                    cloneCertificates: response.data,
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

    onCertificatesPressed(id,name,from,description,start_date,end_date){

        return AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url + 'api/editCertificates/'+id+'?token='+userToken, {
                name,
                from,
                description,
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

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Certificates">
                    <FlatList
                        ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Please add Your certificates first</Text>
                            }
                    data={this.state.cloneCertificates}
                    renderItem={({item}) => (
                        <CertificatesBox removeFromCart={() => this.removeFromCart(item.id)} 
                        onCertificatesPressed={this.onCertificatesPressed} {...item}/>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                    />
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
        position: 'absolute',
        right: 20,
        bottom: 10
    },
});
