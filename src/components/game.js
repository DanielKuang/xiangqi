import React from 'react';
import CapturedPieces from './capturedPieces.js';
import GameBoard from './gameBoard.js';
import initializeBoard from '../helpers/initBoard.js';
import '../../public/css/index.css';


export default class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            tiles: initializeBoard(),
            capturedBlackPieces: [],
            capturedRedPieces: [],
            turn: 1,
            checked: false,
            status: '',
            gameEnd: false,
            winner: null,
            indxOfSelectedPiece: null,
            threatPieceIndx: null,
            blackKingIndx: 4,
            redKingIndx: 85
        }
    }


    clickHandler(i){

        if (gameEnd){
            this.setState({status:'The game has ended. Please click restart for another round.'});
        } 
        
        else if (indxOfSelectedPiece === null){
            const tiles = this.state.tiles.slice();
            if (this.state.turn !== tiles[i].player || !tiles[i]) {
                this.setState({status: "Wrong Selection. Player " + this.state.turn + ", please select your pieces."})
                // if (tiles[i]) {tiles[i].style = {...tiles[i].style, backgroundColor: ''}}; 
            }
            else {
                tiles[i].style = {...tiles[i].style, backgroundColor: 'RGB(111,143,114)'};
                this.setState({status: "Make your move.", indxOfSelectedPiece: i});
            }
        }

        else if (indxOfSelectedPiece !== null) {
            if (checked){
                let kingIndx = (this.state.turn === 1 ? redKingIndx : blackKingIndx);
                if (tiles[this.state.threatPieceIndx].isMovePossible(threatPieceIndx, kingIndx)){
                    this.setState({status:'Player ' + this.state.turn + ', you\'re checked.', indxOfSelectedPiece:null});
                }
                else {
                    // check if possible first! this assumes possible. - done
                    // also check if next player checks the other player and dodges its own check - done
                    let next_player = (this.state.turn === 1 ? 2 : 1);
                    let foeKingIndx = next_player === 1 ? this.state.blackKingIndx : this.state.redKingIndx
                    anotherCheck = false;
                    if (this.state.tiles[i].isMovePossible(i, foeKingIndx) && this.isMoveLegal(this.state.tiles[i].getPathtoDest(i, foeKingIndx))) {
                        anotherCheck = true;
                    }
                    if (this.checkMove(i, this.state.indxOfSelectedPiece, this.state.tiles)){
                        this.makeMove(i); // do we need to return state?
                        let kingMoved = (indxOfSelectedPiece === kingIndx);
                        if (kingMoved) {
                            if (this.state.turn === 1){
                                this.setState({redKingIndx:i});
                            }
                            else{
                                this.setState({blackKingIndx:i});
                            }
                        }
                        this.setState({status:'', indxOfSelectedPiece: null, threatPieceIndx: null, turn: next_player, checked:false});
                        if (anotherCheck) {
                            this.setState({threatPieceIndx:i, checked:true});
                        };

                    } else {
                        this.setState({state:''})
                    }

                }
            }

            else if (this.state.turn === tiles[i].player && tiles[i]) {
                tiles[i].style = {...tiles[i].style, backgroundColor: ''};
                this.setState({status: 'No friendly fire.', indxOfSelectedPiece: -1});
            }
            tiles[indxOfSelectedPiece].style = {...tiles[indxOfSelectedPiece].style, backgroundColor: ''};
        }
    }

    isMoveLegal(pathToDest){
        for (indx in pathToDest){
            if (this.state.tiles[indx] !== null) {
                return false;
            } 
        }
        return true;
    }


    checkMove(i, selectedPieceIndx, tiles){
        if (tiles[selectedPieceIndx].isMovePossible(selectedPieceIndx, i) && this.isMoveLegal(tiles[selectedPieceIndx].getPathtoDest(selectedPieceIndx, i))){
            return true;
        }
        return false;
    }

    makeMove(i){
        whoseTurn = this.state.turn === 1 ? 2 : 1
        tiles = this.state.tiles.slice()
        let capturedPieceArray = (this.state.turn === 1 ? capturedRedPieces.slice() : capturedBlackPieces.slice());
        
        if (this.state.tiles[i]) {
            capturedPieceArray.push(this.state.tiles[i]);
        } 
        this.state.tiles[i] = this.state.tiles[indxOfSelectedPiece];
        this.state.tiles[indxOfSelectedPiece] = null;
        if (whoseTurn === 1){
            this.setState({state:'', turn: whoseTurn, capturedBlackPieces:capturedPieceArray, tiles:tiles, indxOfSelectedPiece:null});
        }
        else {
            this.setState({state:'', turn: whoseTurn, capturedRedPieces:capturedPieceArray, tiles:tiles, indxOfSelectedPiece:null});
        }
    }


    render(){
        color = this.state.turn === 1 ? 'red' : 'black'
        return (
            <div>
                <div className='game'>
                    <div className='gameboard'>
                        <GameBoard tiles= {this.state.tiles} onClick= {(i) => clickHandler(i)} />
                    </div>
                    <div className='gamestats'>
                        <h5>Game Stats</h5>
                        <h3>Winner? {this.state.winner}</h3>
                        <h3>Checked? {this.state.checked}</h3>
                        <h3>Current Player's Turn</h3>
                        <div id="turnbox" style={{backgroundColor: color}}></div>
                        <h3>{this.state.status}</h3>
                        <div className='capturedpieces'>
                            {<CapturedPieces capturedBlackPieces={this.state.capturedBlackPieces} capturedRedPieces={this.state.capturedRedPieces} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}