import React from 'react';
import {createMaterialTopTabNavigator } from 'react-navigation';
import Home from '../screens/app/Home';
import {Icon, Text} from "native-base";
import Interface from "../screens/app/Interface";
import Categories from "../screens/app/Categories";
import Favorites from "../screens/app/Favorites";
import Profile from "../screens/app/Profile";
import Settings from "../screens/app/Settings";
import CourseView from "../screens/app/CourseView";
import ProfileInfo from "../screens/app/ProfileInfo";
import Search from "../screens/app/Search";
import CourseName from "../screens/app/CourseName";
import Color from "../constants/colors";
import SignUp from '../screens/auth/SignUp';

const AppStack = createMaterialTopTabNavigator (
    {
        Interface,
        Categories,
        Favorites,
        Profile,
        Settings,
        CourseView,
        ProfileInfo,
        Search,
        CourseName,
        SignUp
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Interface') {
                    iconName = 'paper';
                } else if (routeName === 'Categories') {
                    iconName = 'apps';
                }
                else if (routeName === 'Favorites') {
                    iconName = 'heart';
                }
                else if (routeName === 'Profile') {
                    iconName = 'person';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} style={{color: tintColor, fontSize: 30}} type="Ionicons" />;
            },
        }),
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,

        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeTintColor: Color.mainColor,
            inactiveTintColor: 'black',
            tabStyle: {
                width: 100,
            },
            style: {
                backgroundColor: 'white',
            },
            indicatorStyle: {
                backgroundColor: Color.mainColor,
                height: 3
            }
        },

        initialRouteName: 'Interface',
    }
);
export default AppStack;