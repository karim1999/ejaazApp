import React, { Component } from 'react';
import { Image, View, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, H3, } from 'native-base';
export default class Favourites extends Component {
  render() {
    return (
        <Container style={{width: '100%'}}>
        <Content style={{flex: 1,}}>
            <View style={{ padding:10,}}>
                <ImageBackground source={require('../../../images/designbig.jpg')}
                 style={{height: 150, width: null,borderRadius:15,overflow: "hidden"}}>
                <View style={{position:'absolute',left:20,top:50}}>
                <H3>UI Design</H3>
                <Text>Trainer</Text>
                </View>
                </ImageBackground>
            </View>
            <View style={{ padding:10,}}>
                <ImageBackground source={require('../../../images/designbig.jpg')}
                 style={{height: 150, width: null,borderRadius:15,overflow: "hidden"}}>
                <View style={{position:'absolute',left:20,top:50}}>
                <H3>UI Design</H3>
                <Text>Trainer</Text>
                </View>
                </ImageBackground>
            </View>
      </Content>
      </Container>
    );
  }
}