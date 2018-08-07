import React from 'react';
import { StyleSheet, View, ListView} from 'react-native';
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
    return axios.get(Server.url + 'api/auth/category')
    .then(response => {
      var standardDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading:false,
        cloneCategory: standardDataSource.cloneWithRows(response.data.CategoriesName)
      });
    })
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator color="#000" />
        </View>
      )
    }
    return (
      <View style={styles.container}>

      <Container>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Icon type="Ionicons" name='code-working' />
                <ListView
                  dataSource={this.state.cloneCategory}
                  renderRow={(rowData) => <Text>Name: {rowData.name}</Text>}
                />
              </Left>
              <Right>
                <Icon type="Ionicons" name="arrow-dropright" />
              </Right>
            </ListItem>
            <ListItem >
             <Left>
                <Icon type="FontAwesome" name='bar-chart' />
                <Text> Business</Text>
              </Left>
              <Right>
                <Icon type="Ionicons" name="arrow-dropright" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon type="MaterialCommunityIcons" name='cloud-braces' />
                <Text> IT & Software</Text>
              </Left>
              <Right>
                <Icon type="Ionicons" name="arrow-dropright" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon type="FontAwesome" name='wrench' />
                <Text> Office Productivity</Text>
              </Left>
              <Right>
                <Icon type="Ionicons" name="arrow-dropright" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Icon type="Ionicons" name='person' />
                <Text> Personal Development</Text>
              </Left>
              <Right>
                <Icon type="Ionicons" name="arrow-dropright" />
              </Right>
            </ListItem>
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
