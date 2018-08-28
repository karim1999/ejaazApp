import React, { Component } from 'react';
import {Button, Icon, Text, Input, Item} from 'native-base';
import {AsyncStorage, Image, StyleSheet, TouchableOpacity, View} from "react-native";

export default class EducationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            id: this.props.id,
            name: this.props.name,
            institution: this.props.institution,
            description: this.props.description,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
        };
        // this.setDate = this.setDate.bind(this);
    }

    render() {
        return (
            <View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>Name</Text>
                <Item regular style={styles.input}>
                    <Input style={styles.inputText} placeholder="Name of your education..." placeholderTextColor="#ccc5c5"
                        onChangeText={(val) => this.setState({name: val})} value={this.state.name}/>
                </Item>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>institution</Text>
                <Item regular style={styles.input}>
                    <Input style={styles.inputText} placeholder="institution of your education..." placeholderTextColor="#ccc5c5"
                        onChangeText={(val) => this.setState({institution: val})} value={this.state.institution}/>
                </Item>
            </View>
            <View style={styles.contentDescription}>
                <Text style={styles.contentTxt}>Description</Text>
                <Item regular style={styles.inputDescription}>
                    <Input style={styles.inputText} placeholder="Description of your education..." placeholderTextColor="#ccc5c5"
                        onChangeText={(val) => this.setState({description: val})} value={this.state.description}/>
                </Item>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>Start_date</Text>
                <Item regular style={styles.input}>
                    <Input style={styles.inputText} placeholder="institution of your education..." placeholderTextColor="#ccc5c5"
                        onChangeText={(val) => this.setState({start_date: val})} value={this.state.start_date}/>
                </Item>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>End_date</Text>
                <Item regular style={styles.input}>
                    <Input style={styles.inputText} placeholder="institution of your education..." placeholderTextColor="#ccc5c5"
                        onChangeText={(val) => this.setState({end_date: val})} value={this.state.end_date}/>
                </Item>
            </View>
            <Button info style={styles.button} onPress={() => this.props.onEducationPressed(this.state.id, this.state.name, this.state.institution, this.state.description, this.state.start_date, this.state.end_date)}>
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
    },
});