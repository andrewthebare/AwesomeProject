import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';

export default function(props){
    return(
        <View style={styles.bottomNavHolder}>
            <View style={{flex:3}}>
                <Text>Bottom Menu Spacer</Text>
            </View>
            <NavBarButton/>
            <NavBarButton/>
        </View>
    )
}

function NavBarButton(){
    return(
        <View style={styles.button}>
            <Text>Hi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavHolder:{
        backgroundColor: '#d51',

        display:'flex',
        flexDirection:'row',
        alignItems:'stretch',

        height:50,
        alignSelf:'stretch',


    },

    button:{
        backgroundColor: '#880',
        justifyContent:'center',

        flex:1,
    }
})
