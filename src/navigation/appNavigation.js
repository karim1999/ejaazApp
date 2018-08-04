import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Home from '../screens/app/Home';

const AppStack = createStackNavigator(
    {
        Home: Home
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    }
);
export default AppStack;