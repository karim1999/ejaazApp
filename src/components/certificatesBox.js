import React, { Component } from 'react';
import {Button, Icon, Text, Input, Item} from 'native-base';
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
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.contentTxt}>Name</Text>
                    <Item regular style={styles.input}>
                        <Input style={styles.inputText} placeholder="Name of your Certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({name: val})} value={this.state.name}/>
                    </Item>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTxt}>from</Text>
                    <Item regular style={styles.input}>
                        <Input style={styles.inputText} placeholder="from of your Certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({from: val})} value={this.state.from}/>
                    </Item>
                </View>
                <View style={styles.contentDescription}>
                    <Text style={styles.contentTxt}>Description</Text>
                    <Item regular style={styles.inputDescription}>
                        <Input style={styles.inputText} placeholder="Description of your Certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({description: val})} value={this.state.description}/>
                    </Item>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTxt}>Received_date</Text>
                    <Item regular style={styles.input}>
                        <Input style={styles.inputText} placeholder="Received_date of your Certificates..." placeholderTextColor="#ccc5c5"
                            onChangeText={(val) => this.setState({received_date: val})} value={this.state.received_date}/>
                    </Item>
                </View>
                <Button info style={styles.button} onPress={() => this.props.onJobsPressed(this.state.id, this.state.name, this.state.from, this.state.description, this.state.received_date)}>
                    <Text style={styles.buttonText}> Submit </Text>
                    {this.state.isLoading && (
                        <ActivityIndicator style={{}} size="small" color="#000000" />
                    )}
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        width: 370,
        height: 350,
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
        flexDirection: 'row',
        height: 60,
        marginBottom:25,
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
        width: 200,
        padding: 10,
        height:70,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
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