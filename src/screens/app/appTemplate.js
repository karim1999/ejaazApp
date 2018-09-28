import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast, Fab} from 'native-base';
import Color from '../../constants/colors';
import {connect} from "react-redux";
import {RefreshControl, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator,Text} from "react-native";
import {setCategories, setUser, setFavorites} from "../../reducers";
import axios from "axios/index";
import Server from "../../constants/config";
import _ from "lodash";

class AppTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            refreshing: false,
            cloneCategory: this.props.categories
        }
    }
    addToFavorites(){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url+'api/favorites/'+this.props.course_id+'?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                });
                this.props.setFavorites(response.data);
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
    removeFromFavorites(){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.delete(Server.url+'api/favorites/'+this.props.course_id+'?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                });
                this.props.setFavorites(response.data);
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
    _onRefresh(){
        this.setState({
            refreshing: true
        });
        if(this.props.refreshing){
            this.props.onLoad().then(() => {
                this.setState({
                    refreshing: false
                });
            })
        }else{
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/auth/me?token='+userToken).then(response => {
                    this.props.setUser(response.data.user);
                    this.props.setCategories(response.data.categories);
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
    }
    render() {
        return (
            <Container>
                <Header hasTabs noShadow
                        style={{ backgroundColor: Color.mainColor }}
                        androidStatusBarColor={Color.mainColor}
                >
                    <Left>
                        {
                            (this.props.back)&&
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        }
                    </Left>
                    <Body>
                    <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity>
                            <Icon style={styles.butt} onPress={()=> this.props.navigation.navigate('Search')} name='md-search' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.butt} onPress={()=> this.props.navigation.navigate('Cart')} name='md-cart' />
                        </TouchableOpacity>
                        {
                            this.state.isLoading ? (
                                <Button transparent>
                                    <ActivityIndicator color="#000000"/>
                                </Button>
                            ) : (
                                (this.props.favorite) && (
                                    _.find(this.props.user.favorites, course => course.id == this.props.course_id) ? (
                                        <Button transparent
                                            onPress={() => this.removeFromFavorites()}
                                        >
                                            <Icon type="FontAwesome" style={{color: "red"}} name="heart"/>
                                        </Button>
                                    ) : (
                                        <Button transparent
                                            onPress={() => this.addToFavorites()}
                                        >
                                            <Icon type="FontAwesome" name="heart-o"/>
                                        </Button>
                                    )
                                )

                            )
                        }
                    </Right>
                </Header>
                <Content
                    refreshing={this.state.refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />
                    }>
                    { this.props.children }
                </Content>
                {
                    (this.props.user.type == 2)?(
                        this.props.fab && (
                            <Fab
                                active={true}
                                style={{ backgroundColor: Color.mainColor }}
                                position="bottomRight"
                                onPress={() => this.props.navigation.navigate('AddCourse')}>
        
                                <Icon size={25} type="Ionicons" name="ios-add-outline" style={{color:'#FFFFFF'}}  />
                            </Fab>
                        )

                    ):(
                        <Text></Text>
                    )

                }
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    butt:{
        padding: 7,
        color: '#fff',
        fontSize: 23
    }

});
const mapStateToProps = ({ categories, user }) => ({
    categories,
    user
});

const mapDispatchToProps = {
    setCategories,
    setUser,
    setFavorites
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTemplate);