import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/auth/SignIn';

const AuthStack = createStackNavigator(
    {
        SignIn: SignIn,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignIn',
    }
);
export default AuthStack;