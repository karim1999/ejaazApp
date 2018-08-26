import React, { Component } from 'react';
import {StyleSheet, View, FlatList, AsyncStorage, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Content, Text, H2 } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";
import Course from "../../../components/course";
import Carousel from "react-native-snap-carousel";
import Color from "../../../constants/colors";


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
    _renderItem ({item, index}) {
        return (
            <View>
                <Text>{ item.title }</Text>
            </View>
        );
    }
    wp (percentage) {
        const Screen = Dimensions.get('window');
        const value = (percentage * Screen.width) / 100;
        return Math.round(value);
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
                                                <Carousel
                                                    layout={'default'}
                                                    ref={(c) => { this._carousel = c; }}
                                                    data={item.courses}
                                                    renderItem={({item}) => (
                                                        <TouchableOpacity
                                                            onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name})}>
                                                            <Course {...item} user_name={item.user.name} />
                                                        </TouchableOpacity>
                                                    )}
                                                    sliderWidth={this.wp(100)}
                                                    itemWidth={this.wp(40)}
                                                    contentContainerCustomStyle	={{justifyContent:'center'}}
                                                    containerCustomStyle={{paddingVertical: 20}}
                                                    inactiveSlideScale={0.95}
                                                    inactiveSlideOpacity={.6}
                                                    activeSlideAlignment={'start'}
                                                    loop={false}

                                                    activeAnimationType={'spring'}
                                                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                                                    activeAnimationOptions={{
                                                        friction: 1,
                                                        tension: 1
                                                    }}
                                                />
                                            ))
                                        }
                                    </View>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
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
    }
});