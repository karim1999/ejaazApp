import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import {View} from "react-native";
export default class componentExample extends Component {
    render() {
        return (
            <View>
                <Button light><Text> Light </Text></Button>
                <Button primary><Text> Primary </Text></Button>
                <Button success><Text> Success </Text></Button>
                <Button info><Text> Info </Text></Button>
                <Button warning><Text> Warning </Text></Button>
                <Button danger><Text> Danger </Text></Button>
                <Button dark><Text> Dark </Text></Button>
            </View>
        );
    }
}