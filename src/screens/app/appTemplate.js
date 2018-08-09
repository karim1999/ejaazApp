import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Content} from 'native-base';
import Color from '../../constants/colors';

export default class AppTemplate extends Component {
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
                            <Icon name='md-search' />
                        </Button>
                        <Button transparent>
                            <Icon name='md-cart' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    { this.props.children }
                </Content>
            </Container>
        );
    }
}