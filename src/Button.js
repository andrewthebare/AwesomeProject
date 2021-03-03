import React from "react";
import View from "react-native-web/src/exports/View";
import Text from "react-native-web/src/exports/Text";

export default function Button(props){
    const stringValue = props.val.toString();

    return(
        <View className='button' onClick={props.onClick}>
            <Text>{stringValue}</Text>
        </View>
    )
}
