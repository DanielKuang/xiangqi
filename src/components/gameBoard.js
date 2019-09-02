import React from 'react';
import Tile from './tile.js';


export default class GameBoard extends React.Component {
    renderSquare(i, squareShade){
        return <Tile piece = {this.props.squares[i]} 
            style = {this.props.squares[i] ? this.props.squares[i].style : null} 
            shade = {squareShade} 
            onClick = {() => this.props.onClick(i)} 
            />
    }

    render() {
        const board = [];

        for (let rowIndx=0; rowIndx<10; rowIndx++){
            const row = [];
            for (let colIndx=0; colIndx<9; colIndx++){
                row.push(this.renderSquare(rowIndx*9+colIndx, isEven(rowIndx+colIndx) ? 'light-tile' : 'dark-tile'));
            }
            board.push(<div>{row}</div>);
        }

        return (<div>{board}</div>);
    }

}

function isEven(num){
    return num%2 === 0;
}