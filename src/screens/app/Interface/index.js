import React, { Component } from 'react';
import {StyleSheet, View, FlatList, AsyncStorage, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Text, H2 } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";
import Color from "../../../constants/colors";
import CourseBox from "../../../components/courseBox"


export default class Interface extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            cloneInterface:[]
        }
    }
    _onLoad(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/courses?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                    cloneInterface: response.data
                });
            }).catch(error => {
                // alert("karim")
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }
    async componentDidMount(){
        await this._onLoad();
    }
    render() {
        return (
            <AppTemplate fab interface onLoad={()=> this._onLoad()} navigation={this.props.navigation} title="Home">
                <View style={styles.all}>
                    {
                        (this.state.isLoading)? (
                            <View>
                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                            </View>
                        ): (
                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle ={styles.searchTitle}
                                    data={this.state.cloneInterface}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("ShowCategories", {...item})} style={{alignSelf: 'flex-start'}}>
                                            <Text style={styles.searchName}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />

                                <FlatList
                                    ListEmptyComponent={
                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No categories were found</Text>
                                    }
                                    data={this.state.cloneInterface}
                                    renderItem={({item}) => (
                                        <View style={{padding: 0}}>
                                            <View style={styles.container}>
                                                <H2 style={styles.containerH1}>{item.name}</H2>
                                            </View>
                                            {
                                                (item.courses && (
                                                    <FlatList
                                                        ListEmptyComponent={
                                                            <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", marginTop: 10}}>Add courses to your cart first</Text>
                                                        }
                                                        data={item.courses}
                                                        renderItem={({item}) => (
                                                            <TouchableOpacity
                                                                onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name, user_id: item.user.id})}>
                                                                <CourseBox {...item} user_name={item.user.name} />
                                                            </TouchableOpacity>
                                                        )}
                                                        keyExtractor = { (item, index) => index.toString() }
                                                    />
                                                ))
                                            }
                                        </View>
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                            </View>
                        )
                    }
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        height: '100%',
        paddingLeft: 0,
        marginLeft: 0
    },
    container: {
    },
    containerH1:{
        alignSelf: 'flex-start',
        backgroundColor: '#6483f7',
        padding: 10,
        marginTop: 15,
        color: '#fff',
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight: "bold",
        fontFamily: "times new roman",
        fontSize: 16,
    },
    searchName:{
        color: '#fff',
        backgroundColor: '#6483f7',
        padding: 5,
        borderRadius: 6,
        alignSelf: 'flex-start',
        fontSize: 16,
        marginLeft: 5
    },
    searchTitle:{
        flexDirection: 'row',
        padding: 10
    },

});