import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator,AsyncStorage, FlatList } from 'react-native';
import { Container, Content, Button, Item, Icon, Text, DatePicker, Input, Toast} from 'native-base';
import Server from "../../../constants/config"
import {removeUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios"
import {setUser} from "../../../reducers";

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: false,
            name:this.props.user.name,
            country:this.props.user.country,
            city:this.props.user.city,
            address:this.props.user.address,
            phone:this.props.user.phone,
        };
      }

      onupdateUserPressed(){
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url + 'api/auth/updateUser/?token='+userToken, {
                name: this.state.name,
                country: this.state.country,
                city: this.state.city,
                address: this.state.address,
                phone: this.state.phone,
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
            <Container style={styles.all}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Name</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({name: val})} value={this.state.item.name}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Country</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({country: val})} value={this.state.country}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>City</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({city: val})} value={this.state.city}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Address</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({address: val})} value={this.state.address}/>
                        </Item>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentTxt}>Phone number</Text>
                        <Item regular style={styles.input}>
                            <Input style={styles.inputText} keyboardType='numeric' placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({phone: val})} value={this.state.phone}/>
                        </Item>
                    </View>
                    <Button info style={styles.button} >
                        <Text style={styles.buttonText} onPress={this.onupdateUserPressed.bind(this)}> Submit </Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </View>
            </Container>
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
    input:{
        width: 200,
        padding: 10,
        height:30,
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

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);