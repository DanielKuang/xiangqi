import Piece from "./piece.js"

export default class Cannon extends Piece{
    constructor(player){
        super(player, (player === 1 ? "../public/xiangqi_pieces/red_cn.png" : "../public/xiangqi_pieces/black_cn.png"))
    }

    isMovePossible(curr_pos, next_pos, destOccupied){
        if ((Math.abs(next_pos-curr_pos) % 9===0 || ((9 - curr_pos+curr_pos%9) > next_pos >= (curr_pos - curr_pos%9))) && !(destOccupied)) {
            return true;
        } else if (destOccupied && (this.getPathtoDest(curr_pos, next_pos).length === 1)){
            return true;
        }
        return false;
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

