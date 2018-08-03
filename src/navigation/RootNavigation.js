import React from 'react';
import { Provider } from 'react-redux';
import {Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './loading'
import AppStack from './appNavigation'
import AuthStack from './authNavigation'

const RootStack= createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

const store = createStore(currentUser);

export default class RootNavigation extends React.Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <RootStack/>
                </Provider>
            </Root>
        );
    }
}
