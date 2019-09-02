import Piece from './piece.js';

export default class Horse extends Piece {
    constructor(player){
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    }

    isMovePossible(curr_pos, next_pos) {
        return ((curr_pos+9+8 === next_pos) ||
        (curr_pos+9+10 === next_pos) ||
        (curr_pos-9-8 === next_pos) ||
        (curr_pos-9-10 === next_pos) ||
        (curr_pos-1+8 === next_pos) ||
        (curr_pos-1-8 === next_pos) ||
        (curr_pos+1+10 === next_pos) ||
        (curr_pos+1-10 === next_pos)
        );
    }

    getSrcToDestPath(curr_pos, next_pos) {
        if (curr_pos+9+10===next_pos || curr_pos+9+8===next_pos) {
            return [curr_pos+9];
        } else if (curr_pos-1-8 === next_pos || curr_pos-1+8 === next_pos) {
            return [curr_pos-1];
        } else if (curr_pos+1+10 === next_pos || curr_pos+1-10 === next_pos) {
            return [curr_pos+1];
        } else if (curr_pos-9-8 === next_pos || curr_pos-9-10 === next_pos) {
            return [curr_pos-9];
        }
    }
}