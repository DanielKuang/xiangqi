import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player===1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"))
    }

    isMovePossible(curr_pos, next_pos){
        return ((curr_pos+1 === next_pos) ||
        (curr_pos-1 === next_pos) ||
        (curr_pos+9 === next_pos) ||
        (curr_pos-9 === next_pos)
        );
    }


    getSrcToDestPath(src, dest){
        return [];
    }

}