import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator,AsyncStorage, FlatList } from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, Toast} from 'native-base';
import Server from "../../../constants/config";
import {connect} from "react-redux";
import axios from "axios";
import {setUser} from "../../../reducers";
import AppTemplate from "../appTemplate";

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
            <AppTemplate back navigation={this.props.navigation} title ="Info">
                <Container style={styles.all}>
                    <Form style={styles.container}>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='pencil' />
                            <Label>Name</Label>
                            <Input onChangeText={(name) => this.setState({name})}
                                placeholder="Enter your name..."
                                placeholderTextColor="#ccc5c5"
                                value={this.state.name}/>
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='flag' />
                            <Label>Country</Label>
                            <Input onChangeText={(country) => this.setState({country})}
                                placeholder="Enter your country..."
                                placeholderTextColor="#ccc5c5"
                                value={this.state.country}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="MaterialCommunityIcons" name='city' />
                            <Label>City</Label>
                            <Input onChangeText={(city) => this.setState({city})}
                                placeholder="Enter your city..."
                                placeholderTextColor="#ccc5c5"
                                value={this.state.city}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="Entypo" name='address' />
                            <Label>Address</Label>
                            <Input onChangeText={(address) => this.setState({address})}
                                placeholder="Enter your address..."
                                placeholderTextColor="#ccc5c5"
                                value={this.state.address}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='mobile-phone' />
                            <Label>Phone number</Label>
                            <Input onChangeText={(phone) => this.setState({phone})}
                                keyboardType='numeric' placeholder="Enter your phone..."
                                placeholderTextColor="#ccc5c5"
                                value={this.state.phone}
                            />
                        </Item>
                        <Button
                            onPress={this.onupdateUserPressed.bind(this)}
                            style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                            block light>
                            <Text>Save</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
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
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{
        position: 'absolute',
        right: 15,
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