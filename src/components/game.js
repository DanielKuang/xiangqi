import React from 'react';
import GameBoard from './gameBoard.js';
import CapturedPieces from './capturedPieces.js';
import initBoard from '../helpers/initBoard.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            tiles: initBoard(),
            redCapturedPieces: [],
            blackCapturedPieces: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'red'
        }
    }

    handleClick(i) {
        const tiles = this.state.tiles.slice();
        if (this.state.sourceSelection === -1) {
            if (!tiles[i] || tiles[i].player !== this.state.player) {
                this.setState({ status: "Wrong Selection. Choose player " + this.state.player + " pieces." });
                if (tiles[i]) { tiles[i].style = { ...tiles[i].style, backgroundColor: "" } };
            }
            else {
                tiles[i].style = { ...tiles[i].style, backgroundColor: "RGB(111,143,114)" };
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
        }
        else if (this.state.sourceSelection > -1) {
            tiles[this.state.sourceSelection].style = { ...tiles[this.state.sourceSelection].style, backgroundColor: '' };
            if (tiles[i] && tiles[i].player === this.state.player) {
                this.setState({
                    status: "Wrong Selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                })
            }
            else {
                const srcPiece = this.state.tiles[this.state.sourceSelection]
                const tiles = this.state.tiles.slice();
                const redCapturedPieces = this.state.redCapturedPieces.slice();
                const blackCapturedPieces = this.state.blackCapturedPieces.slice();
                const isSelfAcrossRiver =  ((this.state.sourceSelection > 44 && srcPiece.player === 2) || (this.state.sourceSelection <= 44 && srcPiece.player === 1))
                const isAcrossRiver = ((i > 44 && srcPiece.player === 2) || (i <= 44 && srcPiece.player === 1))
                const isDestEnemyOccupied = tiles[i] ? true : false;
                const isMovePossible = tiles[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied, isSelfAcrossRiver);
                const srcToDestPath = tiles[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath, this.state.sourceSelection, i, isDestEnemyOccupied, isAcrossRiver);
                if (isMovePossible && isMoveLegal) {
                    if (tiles[i] !== null) {
                        if (tiles[i].player === 1) {
                            redCapturedPieces.push(tiles[i]);
                        }
                        else {
                            blackCapturedPieces.push(tiles[i]);
                        }
                    }
                    tiles[i] = tiles[this.state.sourceSelection];
                    tiles[this.state.sourceSelection] = null;
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'red' ? 'black' : 'red';
                    this.setState({
                        sourceSelection: -1,
                        tiles: tiles,
                        redCapturedPieces: redCapturedPieces,
                        blackCapturedPieces: blackCapturedPieces,
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
        let srcPiece = this.state.tiles[this.state.sourceSelection];
        if (srcPiece.constructor.name === "Elephant") {
            if (isAcrossRiver) {
                return false;
            }
        } else if ((srcPiece.constructor.name === "King") || (srcPiece.constructor.name === "Queen")) {
            if (((!([3, 4, 5, 12, 13, 14, 21, 22, 23].includes(dest)) && this.state.tiles[src].player === 2)) || (!([66, 67, 68, 75, 76, 77, 84, 85, 86].includes(dest)) && this.state.tiles[src].player === 1)) {
                return false;
            }
        }
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (srcPiece.constructor.name === "Cannon") {
                if (this.state.tiles[srcToDestPath[i]] !== null){
                    cannonCounter++;
                    isLegal = false;
                }
                if (cannonCounter === 1 && isDestEnemyOccupied){
                    isLegal = true;
                }
            } else if (this.state.tiles[srcToDestPath[i]] !== null) {
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
                        <GameBoard tiles={this.state.tiles} onClick={(i) => this.handleClick(i)} />
                    </div>
                    <div className="game-info">
                        <h3>Turn</h3>
                        <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}></div>
                        <div className="game-status">{this.state.status}</div>
                        <div className="fallen-soldier-block">
                            {<CapturedPieces redCapturedPieces={this.state.redCapturedPieces}
                                blackCapturedPieces={this.state.blackCapturedPieces} />
                            }
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
