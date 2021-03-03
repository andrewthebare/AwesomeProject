import React, {useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {Alert} from "react-native-web";
import AppButton from "./AppButton";
// import Button from "./Button";

export default function AppCalculator(props) {
    const[display,setDisplay] = useState('Display');
    let factor = 10;

    function fillNumbers() {
        let returnVal = [];

        for (let i = 0; i < 10; i++){
            returnVal.push(<AppButton style={styles.button}
                                    textStyle={styles.whiteText}
                                   title={i.toString()}
                                   onPress={()=> btnClick(true, i)}/>);
        }

        return returnVal;
    }

    function btnClick(isNum, val){
    console.log(val + ' Pushed!');
    if (isNum){
        if(CalcData.isDecimal){
            CalcData.decimalFactor*=.1;
            val*= CalcData.decimalFactor;

        }
        else{
            CalcData.displayVal*=factor;
        }

        //append the value to current display
        CalcData.displayVal += val;
        setDisplay(CalcData.displayVal.toString());

    }else{
        //add the number to the stack
        CalcData.equationStack.push(display);
        CalcData.equationStack.push(val);
        CalcData.clear();

        if (val === '='){
            let result = calculate();   console.log(result);
            setDisplay(result.toString());
            CalcData.equationStack = [];
        } else{
            setDisplay(display + val);
        }
    }

}

    function calculate(){
        const firstNumber = parseFloat(CalcData.equationStack[0]);
        const operator = CalcData.equationStack[1];
        const secondNumber = parseFloat(CalcData.equationStack[2]);
        let result = 0;

        console.log('Calculating ' + firstNumber + ' ' + operator + ' ' + secondNumber);

        if(operator ==='+'){
            result = firstNumber+secondNumber;
        }else if(operator ==='-'){
            result = firstNumber - secondNumber;
        }else if(operator === 'X'){
            result = firstNumber * secondNumber;
        }else if(operator === '/'){
            result=firstNumber/secondNumber;
        }

        return result;
    }


    return(
        <View>
            <View style={styles.display}>
                <View>
                    <Text>{display}</Text>
                </View>
            </View>
            <View className='spacer'><Text> </Text></View>
                <View style={styles.horizontalHolder}>
                    <Button title={'+'} onPress={()=> btnClick(false, '+')}/>
                    <Button title={'-'} onPress={()=> btnClick(false, '-')}/>
                    <Button title={'X'} onPress={()=> btnClick(false, 'X')}/>
                    <Button title={'/'} onPress={()=> btnClick(false, '/')}/>
                    <Button title={'='} onPress={()=> btnClick(false, '=')}/>
                    <Button title={'.'} onPress={()=> btnClick(false, '.')}/>

                    {/*<Button val={'+'} onClick={() => btnClick(false, '+')}/>*/}
                    {/*<Button val={'-'} onClick={() => btnClick(false, '-')}/>*/}
                    {/*<Button val={'X'} onClick={() => btnClick(false, 'X')}/>*/}
                    {/*<Button val={'/'} onClick={() => btnClick(false, '/')}/>*/}
                    {/*<Button val={'='} onClick={() => btnClick(false, '=')}/>*/}
                    {/*<Button val={'.'} onClick={() => {CalcData.isDecimal=true; setDisplay(display +'.')}}/>*/}
                </View>

            <View style={styles.horizontalHolder}>
                {fillNumbers()}
            </View>

        </View>
    )
}

class CalcData{
    static isDecimal = false;
    static decimalFactor = 1;

    static equationStack=[];
    static displayVal = 0;
    static clear() {
        this.displayVal = 0;
        CalcData.decimalFactor=1;
        CalcData.isDecimal = false;
    }
}


const styles = StyleSheet.create({
   display:{
       padding:10,
       height:50,
       display: 'flex',
       justifyContent:'center',
       width:300,

       textAlign:'right',

       backgroundColor:'#999',
   },

   horizontalHolder:{
     display:'flex',
     flexDirection:'row',
     justifyContent: 'center',

       flexWrap:'wrap',
   },

    button:{
       borderWidth:2,
        borderStyle:'solid',
       borderColor:'#900',

        backgroundColor: '#009',
        height: 110,
        width:110,
        display: 'flex',
        justifyContent:'center',

        color:'#fff'
    },

    whiteText:{
        textAlign:'center',
        color: '#fff'
    }


});
