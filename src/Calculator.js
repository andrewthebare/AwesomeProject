import React, {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

// import './baseStyles.css';
import Button from "./Button";

export default function Calculator(){
    const[display,setDisplay] = useState('Display');
    const factor = 10;
    function fillNumbers() {
        let returnVal = [];

        for (let i = 0; i < 10; i++){
            returnVal.push(<Button val={i} onClick={()=> btnClick(true, i)}/>);
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
        <View className='calculator center'>
            <View id='display'>
                <View>
                    <Text>{display}</Text>
                </View>
            </View>
            <View className='spacer'><Text> </Text></View>
            <View className='row'>
                <Button val={'+'} onClick={() => btnClick(false, '+')}/>
                <Button val={'-'} onClick={() => btnClick(false, '-')}/>
                <Button val={'X'} onClick={() => btnClick(false, 'X')}/>
                <Button val={'/'} onClick={() => btnClick(false, '/')}/>
                <Button val={'='} onClick={() => btnClick(false, '=')}/>
                <Button val={'.'} onClick={() => {CalcData.isDecimal=true; setDisplay(display +'.')}}/>
            </View>

            <View className='row'>
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
