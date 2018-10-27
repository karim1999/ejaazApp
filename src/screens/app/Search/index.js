import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, AsyncStorage, ActivityIndicator, CheckBox, Linking } from 'react-native';
import { Container, Content, Header, Text, Button, Icon, H3, Toast, Label, Item} from 'native-base';
import { SearchBar } from 'react-native-elements';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios/index";
import Server from "../../../constants/config";

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            isSearch:false,
            search:"",
            cloneSearch: [],
            check: false,
            min_price: 0,
            max_price: 0,
        }
    }

    checkBoxTest(){
        Linking.openURL('https://google.com')
    }

    onSearchPressed(){
        this.setState({
            isSearch: true,
        });
        return AsyncStorage.getItem('token').then(userToken => {
            axios.post(Server.url + 'api/search?token='+userToken,{
                search: this.state.search
            }).then(response => {
                this.setState({
                    isSearch:false,
                    cloneSearch: response.data
                })
                this.props.navigation.navigate('ResultSearch', {...this.state.cloneSearch})
            }).catch(error => {
                Toast.show({
                    text: "Enter something to search.",
                    buttonText: "Ok",
                    type: "danger"
                })
                this.setState({
                    isSearch:false,
                })
            })
        })

    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Search">
            <View style={styles.all}>
                    <SearchBar
                    lightTheme
                    round
                    searchIcon={{ size: 24 }}
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    cancelButtonTitle="Cancel"
                    placeholder='Search...'
                    onChangeText={(search) => this.setState({search})}
                    onSubmitEditing={()=> this.onSearchPressed()}
                    />

                    <View style={styles.container}>
                    {/* <Button title="Click me" onPress={ ()=>this.checkBoxTest()} >
                    <Text>click</Text>
                    </Button> */}
                        {/* <View style={styles.searchTitle}>
                            <Text style={styles.searchName}>Graphics</Text>
                            <Text style={styles.searchName}>Photoshop</Text>
                        </View> */}

                        {/* <View style={styles.searchContent}> */}
                            {/* <H3 style={styles.searchH3}>Advanced Search</H3>

                            <Item style={{height: 50}}>
                                <CheckBox
                                title='Hightest views'
                                value={this.state.check}
                                onChange={()=> this.checkBoxTest()}
                                />
                                <Label>Hightest views</Label>
                            </Item>
                            <Item style={{height: 50}}>
                                <CheckBox
                                title='Top rated'
                                value={this.state.check}
                                onChange={()=> this.checkBoxTest()}
                                />
                                <Label>Top rated</Label>
                            </Item >
                            <Item style={{height: 50}}>
                                <CheckBox
                                title='Highest reviews'
                                value={this.state.check}
                                onChange={()=> this.checkBoxTest()}
                                />
                                <Label>Highest review</Label>
                            </Item>
                            <Item style={{height: 50}}>
                                <CheckBox
                                title='Budget range'
                                value={this.state.check}
                                onChange={()=> this.checkBoxTest()}
                                />
                                <Label>Budget range</Label>
                            </Item> */}

                            {/* <View style={styles.price}>
                                <Button transparent>
                                <TextInput keyboardType='numeric' style={styles.priceInput}
                                onChangeText={(min_price) => this.setState({min_price})}/>
                                <Text style={styles.footerIcon}>SAR</Text>
                                </Button>
                                <H3 style={styles.searchtH3To}>To</H3>
                                <Button transparent>
                                <TextInput keyboardType='numeric' style={styles.priceInput}
                                onChangeText={(max_price) => this.setState({max_price})}/>
                                <Text style={styles.footerIcon}>SAR</Text>
                                </Button>
                            </View>  */}

                            <Button style={styles.submit} onPress={()=> this.onSearchPressed()}>
                            <Text>Search</Text>
                            {this.state.isSearch && (
                                        <ActivityIndicator size="small" color="#000000" />
                                    )}
                            </Button>
                        {/* </View> */}

                    </View>
            </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    searchTitle:{
        flexDirection: 'row',
        padding: 10
    },
    searchName:{
        color: '#fff',
        backgroundColor: '#6483f7',
        padding: 5,
        borderRadius: 6,
        fontSize: 16,
        marginLeft: 5
    },
    searchContent:{
        marginTop: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    searchH3:{
        padding: 15,
    },
    price:{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 10,
        height: 50,
    },
    priceInput:{
        borderWidth: 1,
        borderColor: '#9da1a4',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
    },
    searchtH3To:{
        padding: 10
    },
    footerIcon:{
        backgroundColor:'#9da1a4',
        color: '#fff',
        paddingTop: 7,
        paddingBottom: 7,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        height: 40,
      },
    submit:{
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#627ffb',
        marginTop: 20
    }
});
