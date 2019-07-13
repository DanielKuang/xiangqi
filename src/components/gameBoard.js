import React from 'react';
import '../index.css';
import Tile from './tile.js';


export default class GameBoard extends React.Component {

    renderTile(pieceIndx) {
        return (<Tile onClick = {() => this.props.onClick(pieceIndx)} piece={this.props.tiles[pieceIndx]} style={this.props.tiles[pieceIndx].style}/>)
    } 

    render(){
        const board = [];

        for (rowIndx=0; rowIndx<10; rowIndx++){
            const row = [];
            for (colIndx=0; colIndx<9; colIndx++){
                row.push(this.renderTile(rowIndx*9+colIndx));
            }
            board.push(<div>{row}</div>);
        }

        return (<div>{board}</div>);
    }
}