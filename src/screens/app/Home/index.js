import React, { Component } from 'react';
import {
    Container, Content, Icon, Tab, Tabs, TabHeading, ScrollableTab,
} from 'native-base';
import AppTemplate from "../appTemplate";
import Colors from "../../../constants/colors";
import Interface from "../Interface";
import Categories from "../Categories";
import Favourites from "../Favourites";
import Profile from "../Profile";

export default class Home extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="News feed">
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