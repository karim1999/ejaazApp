import React from 'react';
import { createTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/app/Home';

const AppStack = createTabNavigator(
    {
        Home: HomeScreen
    },
    {
        initialRouteName: 'Home',
    }
);
export default AppStack;