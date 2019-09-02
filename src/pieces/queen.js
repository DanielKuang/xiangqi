import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, player === 1? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg");
    }

    isMovePossible(curr_pos, next_pos) {
        return ((curr_pos+10 == next_pos) ||
        (curr_pos+8 == next_pos) ||
        (curr_pos-8 == next_pos) ||
        (curr_pos-10 == next_pos));
    }

    getSrcToDestPath(curr_pos,next_pos){
        return [];
    }
}