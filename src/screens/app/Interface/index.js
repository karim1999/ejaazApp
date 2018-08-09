import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, H3 } from 'native-base';
import AppTemplate from "../appTemplate";

export default class Interface extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="News feed">
                <Container style={{width: '100%'}}>
                    <Content>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                            <Card style={{flex: 1}}>
                                <CardItem>
                                    <Body>
                                    <Image source={require("../../../images/Background.png")} style={{height: 200, width: 200, flex: 1}}/>
                                    <H3 style={{padding: 10}}>
                                        Learn how to take care of your health
                                    </H3>
                                    <Text>Hamada</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{flex: 1}}>
                                <CardItem>
                                    <Body>
                                    <Image source={require("../../../images/Background.png")} style={{height: 200, width: 200, flex: 1}}/>
                                    <H3 style={{padding: 10}}>
                                        Learn how to take care of your health
                                    </H3>
                                    <Text>Hamada</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </Content>
                </Container>
            </AppTemplate>
        );
    }
}