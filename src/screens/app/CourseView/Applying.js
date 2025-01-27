'use strict';

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Container, Item, Label, Icon, Toast, Thumbnail, Segment, CardItem, Left, Body, Right, Button} from 'native-base';
import axios from "axios/index";
import Server from "../../../constants/config";
import Color from "../../../constants/colors";
import AppTemplate from "../appTemplate";

export default class Applying extends Component {
    constructor(props){
        super(props);
        this.state={
            cloneApplying:[],
            isLoading:false,
            isApproving:false,
            isDisapproving:false,
            course: this.props.navigation.state.params,
            status: 1,
            statuss: 2,
            email:""
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url+'api/apply/'+this.state.course.id+'?token='+userToken)
            .then(response => {
                this.setState({
                    isLoading:false,
                    cloneApplying: response.data
                }) 
                    // alert(this.state.course.user.email);
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

    approve(id){
        this.setState({
            isApproving: true,
        });
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/apply/'+id+'/approve?token='+userToken,
                    {
                        status: this.state.status,
                        email: this.state.course.user.email
                    }
                )
                .then(response => {
                    Toast.show({
                        text: 'Successfully approve',
                        type: "success",
                        buttonText: 'Okay'
                    });
                    this.setState({
                        isApproving: false,
                    });
                    this.componentDidMount();
                }).catch(error => {
                    this.setState({
                        isApproving: false,
                    });
                    Toast.show({
                        text: "Error reaching the server.",
                        buttonText: "Ok",
                        type: "danger"
                    })
                })
            });
    }

    disapprove(id){
        this.setState({
            isDisapproving: true,
        });
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/apply/'+id+'/approve?token='+userToken,
                    {
                        status: this.state.statuss,
                        email: this.state.course.user.email
                    }
                )
                .then(response => {
                    Toast.show({
                        text: 'Successfully approve',
                        type: "success",
                        buttonText: 'Okay'
                    });
                    this.setState({
                        isDisapproving: false,
                    });
                    this.componentDidMount();
                }).catch(error => {
                    this.setState({
                        isDisapproving: false,
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
            <AppTemplate back navigation={this.props.navigation} title="Applying">
            
                <Segment>
                    <Button style={{ padding:6, backgroundColor: this.state.tab === 2 ? Color.mainColor : undefined, borderColor: '#000',}}
                    active={this.state.tab === 2}first onPress={() => this.setState({tab:2})}>
                    <Text style={{color: this.state.tab === 2 ? "#fff": '#000'}}>Applied</Text>
                    </Button>

                    <Button style={{ padding:6, backgroundColor: this.state.tab === 1 ? Color.mainColor : undefined, borderColor: '#000',}}
                    active={this.state.tab === 1}last onPress={() => this.setState({tab:1})}>
                    <Text style={{color: this.state.tab === 1 ? "#fff": '#000'}}>Applying</Text>
                    </Button>

                </Segment>
                {
                    (this.state.tab === 1) ? (
                        (this.state.isLoading)? (
                        <View>
                            <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                        </View>
                    ):(
                        <FlatList
                            ListEmptyComponent={
                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No one applied for this course</Text>
                                    }
                            data={this.state.cloneApplying}
                            renderItem={({item}) => (
                                (item.status == 1 || item.status == 2)?
                                (<Text></Text>
                                ):(
                                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: item.user_id})}>
                                    <CardItem style={{ padding: 5 }}>
                                        <Left>
                                            <Thumbnail source={{uri: Server.storage+item.user_img}} />
                                            <Body>
                                            <Text>{item.user_name}</Text>
                                            </Body>
                                        </Left>
                                        <Right style={{flexDirection: 'row'}}>
                                            
                                            <Button
                                                onPress={() => this.approve(item.id)}
                                                style={{ backgroundColor: '#6483f7', padding:5, marginRight: 10}}
                                                block light
                                                >
                                                <Text>Approve</Text>
                                                {this.state.isApproving && (
                                                    <ActivityIndicator size="small" color="#000000" />
                                                )}
                                            </Button>
                                            <Button
                                                onPress={() => this.disapprove(item.id)}
                                                style={{ backgroundColor: '#6483f7', padding:5,}}
                                                block light
                                                >
                                                <Text>Disapprove</Text>
                                                {this.state.isDisapproving && (
                                                    <ActivityIndicator size="small" color="#000000" />
                                                )}
                                            </Button>
                                        </Right>
                                        </CardItem>
                                    </TouchableOpacity>

                                )
                                
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />

                    )

                    ):(
                        (this.state.tab === 2) ? (
                            (this.state.isLoading)? (
                            <View>
                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                            </View>
                        ):(
                            <FlatList
                            ListEmptyComponent={
                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No one applied for this course</Text>
                                    }
                            data={this.state.cloneApplying}
                            renderItem={({item}) => (
                                    <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: item.user_id})}>
                                    <CardItem style={{ padding: 5 }}>
                                        <Left>
                                            <Thumbnail source={{uri: Server.storage+item.user_img}} />
                                            <Body>
                                            <Text>{item.user_name}</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            {
                                                (item.status == 1)? (
                                                    <Button
                                                        success
                                                        style={{ padding:5}}
                                                        >
                                                        <Text>Approve</Text>
                                                    </Button>
    
                                                ):(item.status == 2)&&(
                                                    <Button
                                                        danger
                                                        style={{padding:5,}}
                                                        >
                                                        <Text>Disapprove</Text>
                                                    </Button>                                                
                                                )
                                            }
                                        </Right>
                                        </CardItem>
                                    </TouchableOpacity>
    
                                
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />

                        )
                    ):(<Text></Text>)
                )
                    
                }
            </AppTemplate>
            
        );
    }
}


var styles = StyleSheet.create({
  
});