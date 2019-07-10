import Pawn from './pawn.js';
import King from './king.js';
import Queen from './queen.js';

export default class Piece {
    contructor(player, imgDir){
        this.player = player;
        this.style = {backgroundImage: "url('"+imgDir+"')"};
    }

    canCrossRiver() {
        if (this instanceof Pawn) {
            return true;
        }
        return false;
    }

    canCrossHome(){
        if (!(this instanceof King || this instanceof Queen)) {
            return true;
        }
        return false;
    }
}