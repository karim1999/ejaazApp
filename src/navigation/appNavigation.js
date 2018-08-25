import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
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
import UserCourses from '../screens/app/UserCourses';
import UserInfo from '../screens/app/UserInfo';
import Cart from '../screens/app/Cart';
import AddCourse from '../screens/app/AddCourse';
import Color from "../constants/colors";
import SignUp from '../screens/auth/SignUp';

const HomeStack = createStackNavigator({
    Interface,
    Search,
    CourseName,
    CourseView,
    AddCourse
},{
    headerMode: 'none',
});

const ProfileStack = createStackNavigator({
    Profile,
    Settings,
    ProfileInfo,
    UserInfo

},{
    headerMode: 'none',
});

const CategoriesStack = createStackNavigator({
    UserCourses,
    Cart

},{
    headerMode: 'none',
});

const FavoriteStack = createStackNavigator({
    Favorites,
},{
    headerMode: 'none',
});

const AppStack = createMaterialTopTabNavigator (
    {
        HomeStack,
        CategoriesStack,
        FavoriteStack,
        ProfileStack
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'HomeStack') {
                    iconName = 'paper';
                } else if (routeName === 'CategoriesStack') {
                    iconName = 'apps';
                }
                else if (routeName === 'FavoriteStack') {
                    iconName = 'heart';
                }
                else if (routeName === 'ProfileStack') {
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

        initialRouteName: 'HomeStack',
    }
);
export default AppStack;