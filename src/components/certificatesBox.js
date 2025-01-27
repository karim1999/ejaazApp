import React, { Component } from 'react';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label} from 'native-base';
import {AsyncStorage, Image, StyleSheet, TouchableOpacity, View} from "react-native";

export default class CertificatesBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            id: this.props.id,
            name: this.props.name,
            from: this.props.from,
            description: this.props.description,
            received_date: this.props.received_date,
        };
        // this.setDate = this.setDate.bind(this);
    }

    render() {
        return (
            <Container style={styles.all}>
                <Form style={styles.container}>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='pencil' />
                        <Label>Title</Label>
                        <Input onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder="Name of your Certificates...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='institution' />
                        <Label>institution</Label>
                        <Input onChangeText={(institution) => this.setState({institution})}
                            value={this.state.institution}
                            keyboardType='numeric' placeholder="institution of your Certificates...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name='hourglass' />
                        <Label>Received_date</Label>
                        <Input onChangeText={(received_date) => this.setState({received_date})}
                            value={this.state.received_date}
                            keyboardType='numeric' placeholder="received_date of your Certificates...."
                            placeholderTextColor="#ccc5c5"
                        />
                    </Item>
                    <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                        <Icon type="FontAwesome" name='info' />
                        <Text>Description</Text>
                    </Item>
                    <Item style={{marginBottom: 20}}>
                        <Textarea
                            style={{height: 200, paddingTop: 0, marginTop: 0}}
                            style={{flex: 1}}
                            rowSpan={5}
                            bordered
                            onChangeText={(description) => this.setState({description})}
                            placeholder="Write more about the course"
                            placeholderTextColor="#ccc5c5"
                            value={this.state.description}
                        />
                    </Item>
                    <Button
                        onPress={() => this.props.onCertificatesPressed(this.state.id, this.state.name, this.state.institution, this.state.description, this.state.received_date)}
                        style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                        block light>
                        <Text>Save</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                        )}
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20
    },
    content:{
        flexDirection: 'row',
        marginBottom:25,
    },
    contentDescription:{
    },
    input:{
        width: 200,
        padding: 10,
        height:30,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    inputDescription:{
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{
        position: 'absolute',
        right: 15,
    },
    button:{
        backgroundColor: '#6483f7',
        position: 'absolute',
        right: 20,
        bottom: 10
    },
});