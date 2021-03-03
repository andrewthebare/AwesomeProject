import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AppButton(props){
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={props.style}>
                <Text style={props.textStyle}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
