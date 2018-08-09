import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Button, Icon, Left, Right, H2, } from 'native-base';
import AppTemplate from "../appTemplate";
export default class Profile extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Profile">
                <Container style={{width: '100%'}}>
                    <Content style={{flex: 1,}}>
                        <View style={{ padding:10, justifyContent:'center', alignItems: 'center',}}>
                            <H2>Scarlet Johanson</H2>
                            <Thumbnail source={require("../../../images/Background.png")} />
                            <Text>UI Trainer</Text>
                            <Button info style={{alignSelf: 'center', marginTop: 5,}}><Text> Follow </Text></Button>
                        </View>
                        <List>
                            <ListItem>
                                <Left>
                                    <Text> Profile Info</Text>
                                </Left>
                                <Right>
                                    <Icon type="Ionicons" name="arrow-dropright" />
                                </Right>
                            </ListItem>
                            <ListItem >
                                <Left>
                                    <Text> Courses</Text>
                                </Left>
                                <Right>
                                    <Icon type="Ionicons" name="arrow-dropright" />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text> Message</Text>
                                </Left>
                                <Right>
                                    <Icon type="Ionicons" name="arrow-dropright" />
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </AppTemplate>
        );
    }
}