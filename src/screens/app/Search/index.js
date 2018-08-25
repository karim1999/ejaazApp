import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, } from 'react-native';
import { Container, Content, Header, Text, Button, Icon, H3, } from 'native-base';
import { CheckBox ,SearchBar } from 'react-native-elements';
import Color from '../../../constants/colors';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            isSearch:false,
            search:""
        }
    }

    onSearchPressed(){
        return axios.post(Server.url + 'api/search',{
            search: this.state.search
        }).then(response => {

        })
    }

    render() {
        return (
            <Container style={styles.all}>
                <Content>
                    <SearchBar
                    lightTheme
                    round
                    searchIcon={{ size: 24 }}
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    cancelButtonTitle="Cancel"
                    placeholder='Search...' />

                    <View style={styles.container}>
                        <View style={styles.searchTitle}>
                            <Text style={styles.searchName}>Graphics</Text>
                            <Text style={styles.searchName}>Photoshop</Text>
                        </View>

                        <View style={styles.searchContent}>
                            <H3 style={styles.searchH3}>Advanced Search</H3>

                            <CheckBox
                            title='Hightest views'
                            />
                            <CheckBox
                            title='Top rated'
                            />
                            <CheckBox
                            title='Highest reviews'
                            />
                            <CheckBox
                            title='Budget range'
                            />

                            <View style={styles.price}>
                                <Button transparent>
                                <TextInput keyboardType='numeric' style={styles.priceInput} />
                                <Text style={styles.footerIcon}>$</Text>
                                </Button>
                                <H3 style={styles.searchtH3To}>To</H3>
                                <Button transparent>
                                <TextInput keyboardType='numeric' style={styles.priceInput} />
                                <Text style={styles.footerIcon}>$</Text>
                                </Button>
                            </View> 
                            
                            <Button style={styles.submit}><Text>Search</Text></Button>
                        </View>

                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        backgroundColor: '#f1f1f1'        
    },
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
        paddingTop: 10
    },
    priceInput:{
        borderWidth: 1,
        borderColor: '#9da1a4',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingLeft: 30,
        paddingRight: 30,
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
      },
    submit:{
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#627ffb',
        marginTop: 20
    }
});