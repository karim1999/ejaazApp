import React, { Component } from 'react';
import { StyleSheet, View, Image, } from 'react-native';
import { Container, Content, Header, Text, Button, Icon, H3, } from 'native-base';
import AppTemplate from "../appTemplate";
import Hr from "react-native-hr-component";

export default class Cart extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Cart" style={styles.all}>
                <Container style={styles.all}>
                  <Content>
                    <View style={styles.container}>
                        <Text style={styles.containTxt}>Courses in cart</Text>
                        <View style={styles.content}>
                            <View style={styles.contentDet1}>
                                <Image source={require("../../../images/graphic-design-courses.jpg")} style={styles.image}/>
                            </View>
                            <View style={styles.contentDet2}>
                                <Text>the Designing course sadsadasdsadasdasd</Text>
                                <Text style={styles.trainer}>Abderlahman</Text>
                                <Button transparent style={styles.price}>
                                  <Text style={styles.priceText}>12.99</Text> 
                                  <Text style={styles.priceIcon}>$</Text>
                                </Button>
                            </View>
                        </View>
                        <Hr lineColor="#cacaca" width={1} />
                    </View>
                </Content>
              </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1'
    },
    container:{
        width: 400,
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    containTxt:{
        backgroundColor: '#6483f7',
        padding: 10,
        marginTop: 15,
        color: '#fff',
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 130,
    },
    content:{
        flexDirection: 'row',
    },
    contentDet1:{
        width:'40%',
        height: 90
    },
    image:{
    marginTop: 10,
    marginLeft: 20,
    width: null, 
    flex: 1,
    borderRadius: 5
  },
  contentDet2:{
      width: '60%',
      marginLeft: 20,
      marginTop: 5,
  },
  trainer:{
      color: '#9b9b9b',
  },
  price:{
      alignSelf: 'flex-end',
      marginRight: 60,
  },
  priceText:{
    backgroundColor:'#ebebec',
    color: '#000',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  priceIcon:{
    backgroundColor:'#cab4b4',
    color: '#fff',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },
});