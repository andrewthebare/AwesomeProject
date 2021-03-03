import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {ScrollView} from "react-native-web";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title={'Go to Details'}
                onPress={()=> navigation.navigate('Details',{
                    itemId: 86,
                    writtenId: 'eightySix'
                })}/>
        </View>
    );
}

function DetailsScreen({route, navigation}){
    /* 2. Get the param */
    const { itemId } = route.params;
    const { writtenId } = route.params;

    return(
        <View>
            <Text>This is the Details Screen</Text>
            <Text>Item ID: {itemId}</Text>
            <Text>Written ID: {writtenId}</Text>
            <Button
                title={'Make another Details Screen'}
                onPress={() => navigation.push('Details',{itemId:Math.random()*50})}
            />
            <Button
                title={'Go to Home Screen'}
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title={'Press this to go back'}
                onPress={()=> navigation.goBack()}
            />

            <Button
                title={'+1'}
                onPress={()=> navigation.setParams({itemId:itemId+1})}
            />
        </View>
    )
}

const Stack = createStackNavigator();

export default function NavTutorial() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}
                             screenOptions={{
                                 headerStyle:{
                                     backgroundColor:'#999',
                                     height:20
                                 }
                             }}>
                <Stack.Screen name="Home" component={HomeScreen}
                              options={{
                                  title:'Overview',
                              }}/>
                <Stack.Screen name={'Details'} component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
