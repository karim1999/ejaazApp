import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";

export default class ShowCertificates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            isLoading: false,
            cloneCertificates: [],
            name: "",
            institution: "",
            description: "",
            received_date: 0,
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

    onCertificatesPressed(){

        return AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url + 'api/editCertificates/'+this.state.course.id+'?token='+userToken, {
                name: this.state.name,
                institution: this.state.institution,
                description: this.state.description,
                received_date: new Date(this.state.received_date).toLocaleDateString(),
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
                <Container style={styles.all}>
                    <FlatList
                        ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Please add Your certificates first</Text>
                            }
                    data={this.state.cloneCertificates}
                    renderItem={({item}) => (
                        <View style={styles.container}>
                            <View style={styles.content}>
                                <Text style={styles.contentTxt}>Name</Text>
                                <Item regular style={styles.input}>
                                    <Input style={styles.inputText} placeholder="Name of your Certificates..." placeholderTextColor="#ccc5c5"
                                        onChangeText={(val) => this.setState({name: val})} value={this.state.name}/>
                                </Item>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentTxt}>institution</Text>
                                <Item regular style={styles.input}>
                                    <Input style={styles.inputText} placeholder="institution of your Certificates..." placeholderTextColor="#ccc5c5"
                                        onChangeText={(val) => this.setState({institution: val})} value={item.institution}/>
                                </Item>
                            </View>
                            <View style={styles.contentDescription}>
                                <Text style={styles.contentTxt}>Description</Text>
                                <Item regular style={styles.inputDescription}>
                                    <Input style={styles.inputText} placeholder="Description of your Certificates..." placeholderTextColor="#ccc5c5"
                                        onChangeText={(val) => this.setState({description: val})} value={item.description}/>
                                </Item>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentTxt}>Received_date</Text>
                                <Item regular style={styles.input}>
                                    <Input style={styles.inputText} placeholder="institution of your Certificates..." placeholderTextColor="#ccc5c5"
                                        onChangeText={(val) => this.setState({received_date: val})} value={item.received_date}/>
                                </Item>
                            </View>
                            <Button info style={styles.button} onPress={this.onCertificatesPressed.bind(this)}>
                                <Text style={styles.buttonText}> Submit </Text>
                                {this.state.isLoading && (
                                    <ActivityIndicator style={{}} size="small" color="#000000" />
                                )}
                            </Button>
                        </View>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                    />
                </Container>
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
        width: 370,
        height: 350,
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
