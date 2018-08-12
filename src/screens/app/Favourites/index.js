import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Container, Content, Button, Icon, Text,  H3, } from 'native-base';
import AppTemplate from "../appTemplate";
export default class Favourites extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Favorites">
                <Container style={{width: '100%'}}>
                    <Content style={{flex: 1,}}>
                        <View style={styles.container}>
                            <ImageBackground source={require('../../../images/Web-Designing.jpg')} style={styles.image}>
                                <View style={styles.viewContent}>
                                    <H3 style={styles.viewContentH3}>UI Design</H3>
                                    <Text style={styles.viewContentText}>By: Abdelrahman</Text>
                                    <View style={styles.viewContentStar}>
                                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                                    </View>
                                    <Button transparent style={styles.footer}>
                                        <Text style={styles.footerText}>20</Text> 
                                        <Text style={styles.footerIcon}>$</Text>
                                    </Button>
                                </View>
                            </ImageBackground>
                        </View>
                    </Content>
                </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:10
    },
    image:{
        height: 150,
        width: null,
        borderRadius:15,
        overflow: "hidden",
    },
    viewContent:{
        position:'absolute',
        backgroundColor: 'rgba(100,131,247,0.5)',
        height: 150,
        padding: 15,
        paddingTop: 30,
    },
    viewContentH3:{
        color: '#fff'
    },
    viewContentText:{
        color: '#fff',
        fontSize: 11
    },
    viewContentStar:{
        flexDirection: 'row',
    },
    star:{
      color: '#b8d533',
      fontSize: 17
    },
    footer:{
      alignSelf:'center'
    },
    footerText:{
      backgroundColor:'#ebebec',
      borderTopLeftRadius:5,
      borderBottomLeftRadius:5,
      fontSize: 10,
    },
    footerIcon:{
      backgroundColor:'#cbb6b6',
      borderTopRightRadius:5,
      borderBottomRightRadius:5,
      fontSize: 10,
    }

});