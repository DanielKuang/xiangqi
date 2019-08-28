import React from 'react'

export default class Piece extends React.Component {
    contructor(player, imgDir){
        this.player = player;
        this.style = {backgroundImage: "url('"+imgDir+"')"};
    }

    // canCrossRiver() {
    //     if (this instanceof Pawn) {
    //         return true;
    //     }
    //     return false;
    // }

    // canCrossHome(){
    //     if (!(this instanceof King || this instanceof Queen)) {
    //         return true;
    //     }
    //     return false;
    // }
}