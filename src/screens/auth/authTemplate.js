import React, { Component } from 'react';
import {Container, Content} from 'native-base';
import {ImageBackground} from "react-native";

export default class AuthTemplate extends Component {
    render() {
        return (
            <Container>
                <ImageBackground source={require('../../images/Background.png')} style={{height: '100%', width: '100%', }}>
                    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                        { this.props.children }
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}