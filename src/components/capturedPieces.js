import React from 'react';
import Tile from './tile.js';


export default class CapturedPieces extends React.Component {
    renderTile(chess_piece, indx){
        return (<Tile key={indx} piece = {chess_piece} style = {chess_piece.style}/>)
    }

    render(){
        return(
            <div>
                <div>{this.props.redCapturedPieces.map((rs, indx) => this.renderTile(rs,indx))}</div>
                <div>{this.props.blackCapturedPieces.map((bs, indx) => this.renderTile(bs,indx))}</div>
            </div>
        );
    }
}
