import Piece from "./piece.js"

export default class Horse extends Piece {
    constructor(player){
        super(player, (player === 1 ? "../public/xiangqi_pieces/red_he.png" : "../public/xiangqi_pieces/black_he.png"))
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

    getPathtoDest(curr_pos, next_pos) {
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

