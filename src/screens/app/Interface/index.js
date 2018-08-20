import React, { Component } from 'react';
import { StyleSheet, Image, View, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, Text, Body, H2 } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";

export default class Interface extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      cloneInterface:[]
    }
  }

  componentDidMount(){
    return axios.get(Server.url + 'api/auth/courses').then(response => {
      this.setState({
        isLoading: false,
        cloneInterface: response.data
      });
    }).catch(error => {
      alert(error.data)
    })
  }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="News feed">
                <Container>
                  <Content>
                    <View style={styles.container}>
                      <H2 style={styles.containerH1}>New and Noteworth</H2>
                      <FlatList 
                      data={this.state.cloneInterface}
                      renderItem={({item}) => (
                        
                        <View style={styles.viewDirection}>
                          <Card style={styles.card}>
                            <CardItem cardBody>
                              <Image source={require("../../../images/graphic-design-courses.jpg")} style={styles.image}/>
                              </CardItem>
                              <CardItem header>
                              <Text onPress={()=> this.props.navigation.navigate('CourseView')} style={styles.cardText}>
                              {item.title}</Text>
                            </CardItem>
              
                            <View>
                                <Text style={styles.carditemText}>
                                  {item.user_name}
                                </Text>
                            </View>
                          
                            <View style={styles.viewContentStar}>
                              <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                              <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                              <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                              <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                              <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" /> 
                              <Text style={styles.viewContentStarText}>4.6</Text>
                            </View>
              
                            <View footer style={styles.footer}>
                              <Button transparent>
                                <Text style={styles.footerText}>{item.price}</Text> 
                                <Text style={styles.footerIcon}>$</Text>
                              </Button>
                            </View>
                          </Card>

                      </View>
                      )}

                      keyExtractor = { (item, index) => index.toString() }
                      />
                    </View>
                    
                  </Content>
              </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    padding:5,
  },
  containerH1:{
    marginLeft:10
  },
  viewDirection:{
    flexDirection:'row',
  },
  card:{
    width:200,
    marginLeft:10,
    borderRadius:10,
  },
  image:{
    height: 120, 
    width: 200, 
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    flex: 1
  },
  cardText:{
    color:'#000',
    fontSize:15,
  },
  carditemText:{
    color: '#1e1e1e',
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 5
  },
  viewContentStar:{
      flexDirection: 'row',
      alignSelf: 'flex-start',
      paddingLeft: 15,
  },
  star:{
    color: '#b8d533'
  },
  viewContentStarText:{
    fontSize: 12,
    color: '#5f5f5f',
    paddingTop: 7,
    paddingLeft: 6
  },
  footer:{
    alignSelf:'flex-end',
    marginRight: 10,
  },
  footerText:{
    backgroundColor:'#ebebec',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  footerIcon:{
    backgroundColor:'#cbb6b6',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  }

});