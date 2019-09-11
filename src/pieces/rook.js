import Piece from './piece.js';

export default class Rook extends Piece {
    constructor(player){
        super(player, (player === 1 ? "./xiangqi_pieces/red_rk.png" : "./xiangqi_pieces/black_rk.png"));
    }

    isMovePossible(curr_pos, next_pos){
        return (Math.abs(next_pos-curr_pos) % 9===0 ||
        (((9-(curr_pos%9) + curr_pos) > next_pos) && (next_pos >= (curr_pos - curr_pos%9)))
        );
    }

    getSrcToDestPath(curr_pos, next_pos){
        let path = [], pathStart, pathEnd, incrementBy;

        if (curr_pos>next_pos){
            pathStart = next_pos;
            pathEnd = curr_pos;
        }
        else{
            pathStart = curr_pos;
            pathEnd = next_pos;
        }

        if(Math.abs(curr_pos-next_pos) % 9 === 0){
            incrementBy = 9;
            pathStart += 9;
        }
        else {
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}