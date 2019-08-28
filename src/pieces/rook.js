import Piece from "./piece.js"

export default class Rook extends Piece{
    constructor(player){
        super(player, (player === 1 ? "../public/xiangqi_pieces/red_rk.png" : "../public/xiangqi_pieces/black_rk.png"))
    }

    isMovePossible(curr_pos, next_pos){
        return (Math.abs(next_pos-curr_pos) % 9===0 ||
        ((9 - curr_pos+curr_pos%9) > next_pos >= (curr_pos - curr_pos%9))
        );
    }

    getPathtoDest(curr_pos, next_pos) {
        let path = [], start, end, increment;

        if(curr_pos>next_pos) {
            start = next_pos;
            end = curr_pos;
        }

        else {
            start = curr_pos;
            end = next_pos;
        }

        if (Math.abs(curr_pos-next_pos) % 9 === 0) {
            increment = 9;
            start = 9;
        }

        else {
            increment = 1;
            start = 1;
        }

        for (let i = start; i < end; i += increment) {
            path.push(i);
        }
        
        return path;
    }
}

