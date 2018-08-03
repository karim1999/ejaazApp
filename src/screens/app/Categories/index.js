import React from 'react';
import { StyleSheet, View,} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Title, Body, Button } from 'native-base';


export default class Categories extends React.Component {

  render() {
    return (
      <View style={styles.container}>

      <Container>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Icon type="Ionicons" name='code-working' />
                <Text> Development</Text>
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
