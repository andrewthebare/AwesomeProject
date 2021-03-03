import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavBar from "./BottomNavBar";
import TicTacToe from "./TicTacToe";

const Stack = createStackNavigator();

export default function LittleGamesHub(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Hub}
                             screenOptions={{headerStyle: styles.headerStyle}}>
                <Stack.Screen
                    name="Hub"
                    component={Hub}
                    options={{ title: 'The Hub' }}
                />
                <Stack.Screen
                    name={'TicTacToe'} component={TicTacToe}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function Hub({navigation}) {
    return( //Will need to implement scroll
        <View style={styles.hub}>
            <GameCard onTouch={()=> navigation.navigate('TicTacToe')}/>
            <BottomNavBar/>
        </View>
    )
}

function GameCard(props){
    return(
        <TouchableOpacity onPress={props.onTouch}>
            <View style={styles.gameCard}>
                <View style={styles.cardZone}>
                    <View>
                        <Text>Title</Text>
                    </View>
                    <Text>This is game card</Text>
                </View>

                <View style={{width:2}}>

                </View>

                <View style={styles.cardZone}>
                    <Text>Im a picture</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor:'#999',
        height:60,
    },
    hub:{
        height: Dimensions.get('window').height-60,

        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },

    gameCard:{
        backgroundColor: '#d8d8d8',
        borderStyle:'solid',
        borderColor:'#ababab',
        borderRadius:10,
        borderWidth:2,

        width:340,
        height:120,
        margin:10,      //for when we eventually make a scroll bar

        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },

    cardZone:{
        flex:1,
        // backgroundColor:"#900",
        justifyContent:'center',
        alignItems:'center',

       margin:4,

        borderColor: '#c7c7c7',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,

    }

});

