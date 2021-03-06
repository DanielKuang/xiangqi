import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player===1 ? "./xiangqi_pieces/red_kg.png" : "./xiangqi_pieces/black_kg.png"))
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