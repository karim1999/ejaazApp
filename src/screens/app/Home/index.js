import React, { Component } from 'react';
import {Text} from 'native-base';
import AppTemplate from "../appTemplate";
import componentExample from "../../../components/componentExample";
import Colors from "../../../constants/colors";

export default class Home extends Component {
    render() {
        return (
            <AppTemplate>
                <Text style={{color: Colors.mainColor}}>Home</Text>
                <componentExample/>
            </AppTemplate>
        );
    }
}