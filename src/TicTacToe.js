import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity} from 'react-native';

import BottomNavBar from "./BottomNavBar";

//TODO Reset game upon initial load
export default function TicTacToe() {
    const[infoDisplay,setInfo]= useState('X Turn');

    //board Hooks
    const [virtualBoard,setVirtualBoard]=useState({
                                        0:{value:' '},
                                        1:{value:' '},
                                        2:{value:' '},
                                        3:{value:' '},
                                        4:{value:' '},
                                        5:{value:' '},
                                        6:{value:' '},
                                        7:{value:' '},
                                        8:{value:' '},
                                    });

    let turnCount =0;
    let winnerFound= false;
    let xTurn=true;
    let expectedChar = 'X';

    function reset(){
        turnCount=0;
        winnerFound=false;
        xTurn=true;
        expectedChar='X';
        setInfo('X Turn');

        let newBoard = virtualBoard;
        for (let virtualBoardKey in virtualBoard) {
            newBoard[virtualBoardKey].value=' ';
        }

        setVirtualBoard(newBoard);
        console.log('using new Board'+ newBoard["0"].value);
    }

    function checkWinner(){
        const possibleWins=[[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];

        let winFound=false;
        for(let i =0; i < possibleWins.length && !winFound; i++){
            let thisWinner=true;
            let winCheck = possibleWins[i];

            for(let j = 0; j < 3; j++){
                if(virtualBoard[winCheck[j]].value !== expectedChar){
                    thisWinner = false;
                }
                winFound=thisWinner;
            }
        }

        return winFound;
    }

    function pushed({name, placed, setHolder}){            //holds all the game logic


        if(!placed){
            turnCount++;

            let newBoard=virtualBoard;
            newBoard[name].value=expectedChar;
            setVirtualBoard(newBoard);

            //update virtual
            virtualBoard[name.toString()].value = expectedChar;

            winnerFound=checkWinner();

            //update display
            if (winnerFound){
                setInfo(expectedChar + ' Won!');
            }else{
                if(turnCount === 9){
                    setInfo('Its a draw!')
                }
            }
            //flip turns
            xTurn=!xTurn;
            xTurn? expectedChar='X':expectedChar='O';
        }
    }
    //TODO Rearrange Square to take state variables so that they can be reset

    return(
        <View style={styles.screen}>
            <View style={{flex:1,display:'flex', justifyContent:'center'}}>
                <View style={styles.board}>
                    <View style={styles.row}>
                        <Square name={0} placed={false} pushed={pushed} holding={virtualBoard["0"].value}/>
                        <Square name={1} placed={false} pushed={pushed}/>
                        <Square name={2} placed={false} pushed={pushed}/>
                    </View>
                    <View style={styles.row}>
                        <Square name={3} placed={false} pushed={pushed}/>
                        <Square name={4} placed={false} pushed={pushed}/>
                        <Square name={5} placed={false} pushed={pushed}/>
                    </View>
                    <View style={styles.row}>
                        <Square name={6} placed={false} pushed={pushed}/>
                        <Square name={7} placed={false} pushed={pushed}/>
                        <Square name={8} placed={false} pushed={pushed}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text>
                        {infoDisplay}
                    </Text>
                    <Button title={'Reset'} onPress={()=> reset()}/>
                </View>
            </View>

            <BottomNavBar/>
        </View>
    )
}

function Square(props){
    const name = props.name;
    const[holder, setHolder] = useState(props.holding);
    let placed = !(holder ===' ');
    let pushed = props.pushed;

    return(
        <TouchableOpacity onPress={()=> pushed({name, placed, setHolder})}>
            <View style={styles.square}>
                <Text>{props.holding}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    screen:{
        height: Dimensions.get('window').height-60,

        display:'flex',
        justifyContent:'space-between',
        alignItems:'stretch'
    },


    board:{
        alignSelf:'center',
        backgroundColor:'#d5d5d5',
        padding:5,
        borderRadius:10,

    },

    row:{
        flexDirection:'row',
    },

    square:{
        height:90,
        width:90,

        borderColor:'#bbb',
        borderStyle:'solid',
        borderWidth:1,

        alignItems: 'center',
        justifyContent: 'center',

    }
});
