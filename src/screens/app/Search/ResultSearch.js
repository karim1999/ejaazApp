import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Text, Button, Icon, H3, Thumbnail, Segment, CardItem, Left, Body} from 'native-base';
import { CheckBox ,SearchBar } from 'react-native-elements';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import CourseBox from "../../../components/courseBox";
import Server from "../../../constants/config";

export default class ResultSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            search: this.props.navigation.state.params
        }
    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Result">
                <Segment>
                    <Button style={{ backgroundColor: this.state.tab === 2 ? Color.mainColor : undefined, borderColor: '#000',}}
                    active={this.state.tab === 2}first onPress={() => this.setState({tab:2})}>
                    <Text style={{color: this.state.tab === 2 ? "#fff": '#000'}}>Courses</Text>
                    </Button>

                    <Button style={{ backgroundColor: this.state.tab === 1 ? Color.mainColor : undefined, borderColor: '#000',}}
                    active={this.state.tab === 1}last onPress={() => this.setState({tab:1})}>
                    <Text style={{color: this.state.tab === 1 ? "#fff": '#000'}}>Users</Text>
                    </Button>

                </Segment>
                {
                    (this.state.tab === 2) ? (
                        <FlatList
                           data={this.state.search.courses}
                           renderItem={({item}) => (
                                <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name, user_id: item.user.id})}>
                                <CourseBox {...item} user_name={item.user.name} />
                                </TouchableOpacity>
                           )}
                           keyExtractor = { (item, index) => index.toString() }
                       />

                    ):(
                        <FlatList
                           data={this.state.search.users}
                           renderItem={({item}) => (
                                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: item.id})}>
                                <CardItem style={{ padding: 5 }}>
                                    <Left>
                                        <Thumbnail source={{uri: Server.storage+item.img}} />
                                        <Body>
                                        <Text>{item.name}</Text>
                                        </Body>
                                    </Left>
                                    </CardItem>
                                </TouchableOpacity>
                           )}
                           keyExtractor = { (item, index) => index.toString() }
                       />
                    )
                }
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({

});