import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast} from 'native-base';
import Color from '../../constants/colors';
import {connect} from "react-redux";
import {RefreshControl, StyleSheet, AsyncStorage} from "react-native";
import {setCategories, setUser} from "../../reducers";
import axios from "axios/index";
import Server from "../../constants/config";

class AppTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            cloneCategory: this.props.categories
        }
    }
    _onRefresh(){
        this.setState({
            refreshing: true
        });
        if(this.props.interface){
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
                        <Button transparent>
                            <Icon onPress={()=> this.props.navigation.navigate('Search')} name='md-search' />
                        </Button>
                        <Button transparent>
                            <Icon onPress={()=> this.props.navigation.navigate('Cart')} name='md-cart' />
                        </Button>
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
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },

});
const mapStateToProps = ({ categories, user }) => ({
    categories,
    user
});

const mapDispatchToProps = {
    setCategories,
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTemplate);