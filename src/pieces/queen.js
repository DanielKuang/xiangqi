import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, player === 1? "./xiangqi_pieces/red_qn.png" : "./xiangqi_pieces/black_qn.png");
    }

    isMovePossible(curr_pos, next_pos) {
        return ((curr_pos+10 === next_pos) ||
        (curr_pos+8 === next_pos) ||
        (curr_pos-8 === next_pos) ||
        (curr_pos-10 === next_pos));
    }

    getSrcToDestPath(curr_pos,next_pos){
        return [];
    }
}