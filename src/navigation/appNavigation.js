import React from 'react';
import { createTabNavigator } from 'react-navigation';
import Home from '../screens/app/Home';

const AppStack = createTabNavigator(
    {
        Home: Home
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    }
);
export default AppStack;