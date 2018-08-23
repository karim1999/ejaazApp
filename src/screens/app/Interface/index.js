import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, AsyncStorage, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, Text, Body, H2 } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";
import Course from "../../../components/course";
import Carousel from "react-native-snap-carousel";


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
                alert(error.data)
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
            <AppTemplate interface onLoad={()=> this._onLoad()} navigation={this.props.navigation} title="News feed">
                <Container>
                    <Content>
                        <View>
                            <View style={styles.container}>
                                <H2 style={styles.containerH1}>New and Noteworth</H2>
                            </View>
                            <Carousel
                                layout={'default'}
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.cloneInterface}
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
                                loop={true}

                                activeAnimationType={'spring'}
                                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                                activeAnimationOptions={{
                                    friction: 1,
                                    tension: 1
                                }}
                            />
                        </View>
                    </Content>
                </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:5,
    },
    containerH1:{
        marginLeft:10
    }
});