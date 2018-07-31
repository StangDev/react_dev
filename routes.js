import React from 'react';
import Settings from './screens/Settings';
import Home from './screens/Home';
import Login from './screens/Login';
import {createDrawerNavigator ,createStackNavigator} from 'react-navigation';
import { View, Text, Button,StyleSheet } from 'react-native';
const Drawer = createDrawerNavigator({
    Home: {
    screen: Home,
    title: 'Home',
},
  Settings: {
    screen: Settings,
    title: 'Settings'
},
Login: {
    screen: Login,
    title: 'Login'
}
},{
  drawerPosition : 'left',
  drawerWidth: 250,
  headerMode: 'screen',
});


const StackNavigator = createStackNavigator({
    MainNavigator: {
        screen: Drawer
    },
}, {
  
    headerMode: 'none',
});



export default StackNavigator;