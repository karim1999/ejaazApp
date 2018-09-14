import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Home from '../screens/app/Home';
import {Icon, Text} from "native-base";
import Interface from "../screens/app/Interface";
import Categories from "../screens/app/Categories";
import Favorites from "../screens/app/Favorites";
import Profile from "../screens/app/Profile";
import Settings from "../screens/app/Settings";
import Education from "../screens/app/Settings/Education/Education";
import AddEducation from "../screens/app/Settings/Education/AddEducation";
import Certificates from "../screens/app/Settings/Certificates/Certificates";
import AddCertificates from "../screens/app/Settings/Certificates/AddCertificates";
import Jobs from "../screens/app/Settings/Jobs/Jobs";
import AddJobs from "../screens/app/Settings/Jobs/AddJobs";
import Security from "../screens/app/Settings/Security";
import CourseView from "../screens/app/CourseView";
import Applying from "../screens/app/CourseView/Applying";
import ProfileInfo from "../screens/app/ProfileInfo";
import Search from "../screens/app/Search";
import ResultSearch from "../screens/app/Search/ResultSearch";
import CourseName from "../screens/app/CourseName";
import UserCourses from '../screens/app/UserCourses';
import UserInfo from '../screens/app/UserInfo';
import Cart from '../screens/app/Cart';
import AddCourse from '../screens/app/AddCourse';
import ShowCategories from '../screens/app/Categories/ShowCategories';
import EditCourse from '../screens/app/CourseView/editCourse';
import AddVideos from '../screens/app/CourseView/AddVideos';
import Videos from '../screens/app/CourseView/Videos';
import Color from "../constants/colors";
import CallUs from '../screens/app/CallUs';

const HomeStack = createStackNavigator({
    Interface,
    CourseName,
    Search,
    ResultSearch,
    CourseView,
    AddCourse,
    ShowCategories,
    EditCourse,
    AddVideos,
    Videos,
    Applying
},{
    headerMode: 'none',
});

const ProfileStack = createStackNavigator({
    Profile,
    Settings,
    ProfileInfo,
    Education,
    AddEducation,
    Security,
    Jobs,
    AddJobs,
    Certificates,
    AddCertificates,
    UserInfo,
    CallUs

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