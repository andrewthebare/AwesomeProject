import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {ScrollView} from "react-native-web";
import LittleGamesHub from "./src/LittleGamesHub";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
    return (
        <LittleGamesHub/>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#0d0',
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    red:{
        color: '#d00',
        margin:5,
    },

    bgButton:{
        color:'#fff',
        backgroundColor: '#000',
        margin: 20,
        borderStyle:'solid',
        borderWidth:5,
        borderColor:'#999',
    }
});
