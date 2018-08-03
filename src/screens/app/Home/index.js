import React, { Component } from 'react';
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, H3,
    Tab, Tabs, TabHeading,} from 'native-base';
import AppTemplate from "../appTemplate";
import ComponentExample from "../../../components/componentExample";
import Colors from "../../../constants/colors";
import Interface from "../Interface";
import Categories from "../Categories";
import Favourites from "../Favourites";
import Profile from "../Profile";

export default class Home extends Component {
    render() {
        return (
            <AppTemplate>
                <Container style={{width: '100%', height: '100%'}}>
                <Tabs>
                  <Tab heading={ <TabHeading><Icon name="paper" /></TabHeading>}>
                    <Interface />
                  </Tab>
                  <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
                    <Categories />
                  </Tab>
                  <Tab heading={ <TabHeading><Icon name="heart" /></TabHeading>}>
                    <Favourites />
                  </Tab>
                  <Tab heading={ <TabHeading><Icon name="person" /></TabHeading>}>
                    <Profile />
                  </Tab>
                </Tabs>
                <Content>
                </Content>
             </Container>
            </AppTemplate>
        );
    }
}