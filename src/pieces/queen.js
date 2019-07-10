import Piece from "./piece.js"

export default class Queen extends Piece{
    constructor(player){
        super(player, (player === 1 ? "../public/xiangqi_pieces/red_qn.png" : "../public/xiangqi_pieces/black_qn.png"))
    }

    isMovePossible(curr_pos, next_pos) {
        return ((curr_pos+10 == next_pos) ||
        (curr_pos+8 == next_pos) ||
        (curr_pos-8 == next_pos) ||
        (curr_pos-10 == next_pos));
    }

    getPathtoDest(curr_pos, next_pos) {
        return []; // Queen only moves in diagonal, one step.
    }

}

