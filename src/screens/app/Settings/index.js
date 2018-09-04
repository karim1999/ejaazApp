import React, { Component } from 'react';
import { Tabs, Tab } from 'native-base';
import AppTemplate from "../appTemplate";
import Education from "./Education/Education";
import Jobs from "./Jobs/Jobs";
import Certificates from "./Certificates/Certificates";
import Security from "./Security";

export default class Settings extends Component {
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title ="Settings">
                <Tabs>
                    <Tab heading="Education">
                        <Education />
                    </Tab>
                    <Tab heading="Jobs">
                        <Jobs />
                    </Tab>
                    <Tab heading="Certificates">
                        <Certificates />
                    </Tab>
                    <Tab heading="Security">
                        <Security />
                    </Tab>
                </Tabs>
            </AppTemplate>
        );
    }
}
