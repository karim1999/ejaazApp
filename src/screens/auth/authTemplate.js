import React, { Component } from 'react';
import {Container, Content} from 'native-base';

export default class AuthTemplate extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                    { this.props.children }
                </Content>
            </Container>
        );
    }
}