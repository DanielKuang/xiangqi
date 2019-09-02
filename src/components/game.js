import React from 'react';
import '../index.css';
import Board from './board.js';
import FallenSoldierBlock from './fallensoldierblock.js';
import initializeChessBoard from '../helpers/initializeChessBoard.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: initializeChessBoard(),
            whiteFallenSoldiers: [],
            blackFallenSoldiers: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white'
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.player) {
                this.setState({ status: "Wrong Selection. Choose player " + this.state.player + " pieces." });
                if (squares[i]) { squares[i].style = { ...squares[i].style, backgroundColor: "" } };
            }
            else {
                squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" };
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
        }
        else if (this.state.sourceSelection > -1) {
            squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: '' };
            if (squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    status: "Wrong Selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                })
            }
            else {
                const srcPiece = this.state.squares[this.state.sourceSelection]
                const squares = this.state.squares.slice();
                const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
                const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
                const isSelfAcrossRiver =  ((this.state.sourceSelection > 44 && srcPiece.player === 2) || (this.state.sourceSelection <= 44 && srcPiece.player === 1))
                const isAcrossRiver = ((i > 44 && srcPiece.player === 2) || (i <= 44 && srcPiece.player === 1))
                const isDestEnemyOccupied = squares[i] ? true : false;
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied, isSelfAcrossRiver);
                const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath, this.state.sourceSelection, i, isDestEnemyOccupied, isAcrossRiver);
                if (isMovePossible && isMoveLegal) {
                    if (squares[i] !== null) {
                        if (squares[i].player === 1) {
                            whiteFallenSoldiers.push(squares[i]);
                        }
                        else {
                            blackFallenSoldiers.push(squares[i]);
                        }
                    }
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'white' ? 'black' : 'white';
                    this.setState({
                        sourceSelection: -1,
                        squares: squares,
                        whiteFallenSoldiers: whiteFallenSoldiers,
                        blackFallenSoldiers: blackFallenSoldiers,
                        player: player,
                        status: '',
                        turn: turn
                    });
                }
                else {
                    this.setState({
                        status: "Wrong selection. Choose valid source and destination again.",
                        sourceSelection: -1,
                    });
                }
            }
        }

    }


    isMoveLegal(srcToDestPath, src, dest, isDestEnemyOccupied, isAcrossRiver) {
        let isLegal = true;
        let cannonCounter = 0;
        let srcPiece = this.state.squares[this.state.sourceSelection];
        if (srcPiece.constructor.name === "Elephant") {
            if (isAcrossRiver) {
                return false;
            }
        } else if ((srcPiece.constructor.name === "King") || (srcPiece.constructor.name === "Queen")) {
            if (((!([3, 4, 5, 12, 13, 14, 21, 22, 23].includes(dest)) && this.state.squares[src].player === 2)) || (!([66, 67, 68, 75, 76, 77, 84, 85, 86].includes(dest)) && this.state.squares[src].player === 1)) {
                return false;
            }
        }
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (srcPiece.constructor.name === "Cannon") {
                if (this.state.squares[srcToDestPath[i]] !== null){
                    cannonCounter++;
                    isLegal = false;
                }
                if (cannonCounter === 1 && isDestEnemyOccupied){
                    isLegal = true;
                }
            } else if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
                    </div>
                    <div className="game-info">
                        <h3>Turn</h3>
                        <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}></div>
                        <div className="game-status">{this.state.status}</div>
                        <div className="fallen-soldier-block">
                            {<FallenSoldierBlock whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                                blackFallenSoldiers={this.state.blackFallenSoldiers} />
                            }
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
