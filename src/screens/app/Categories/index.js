import React from 'react';
import {StyleSheet, View, ListView, FlatList} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Title, Body, Button, ActivityIndicator } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";


export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cloneCategory:[]
        }
    }
    componentDidMount(){
        return axios.get(Server.url + 'api/auth/category').then(response => {
            this.setState({
                isLoading:false,
                cloneCategory: response.data
            });
        }).catch(error => {
            alert(error.data)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Container>
                    <Content>
                        <List>
                            <FlatList
                                data={this.state.cloneCategory}
                                renderItem={({item}) => (
                                    <ListItem>
                                        <Left>
                                            <Icon type="Ionicons" name='person' />
                                            <Text> {item.name}</Text>
                                        </Left>
                                        <Right>
                                            <Icon type="Ionicons" name="arrow-dropright" />
                                        </Right>
                                    </ListItem>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
                        </List>
                    </Content>
                </Container>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },

});
