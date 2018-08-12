import React, { Component } from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { Container, Content, Form, Item, Button, Icon, Text, Body, H2, Input, Tabs, Tab } from 'native-base';
import AppTemplate from "../appTemplate";
import Education from "./Education";
import Jobs from "./Jobs";
import Certificates from "./Certificates";
import Security from "./Security";

export default class Settings extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Setting">
                <Container>
                    <Tabs>
                    <Tab heading="Education">
                        <Education />
                    </Tab>
                    <Tab heading="Jobs">
                        <Jobs />
                    </Tab>
                    <Tab heading="Certificates">
                        <Certificates />
                    </Tab>
                    <Tab heading="Security">
                        <Security />
                    </Tab>
                    </Tabs>
                </Container>
                {/* <Container>
                  <Content>
                    <Form>
                        <View>
                            <Item>
                            <Text>Country</Text>
                            <View style={styles.viewInput}>
                            <TextInput style={styles.inputText}/>
                            </View>
                            </Item>
                        </View>
                        <View>
                            <Text>City</Text>
                            <Item rounded style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#fff"/>
                            </Item>
                        </View>
                        <View>
                            <Text>Address</Text>
                            <Item rounded style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#fff"/>
                            </Item>
                        </View>
                        <View>
                            <Text>Phone</Text>
                            <Item rounded style={styles.input}>
                            <Input style={styles.inputText} placeholderTextColor="#fff"/>
                            </Item>
                        </View>
                    </Form>
                    
                  </Content>
              </Container> */}
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        width: 300,
        marginBottom: 10,
        padding: 10,
        height: 40,
        alignSelf: 'center',
    },
    inputText:{
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#aaa',
        width: 200,
        borderRadius: 10,
    }, 
    viewInput:{
    },

});