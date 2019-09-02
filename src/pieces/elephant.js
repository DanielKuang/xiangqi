import Piece from './piece.js';

export default class Elephant extends Piece {
    constructor(player){
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    }

    isMovePossible(curr_pos, next_pos){
        return ((curr_pos+16 === next_pos) ||
        (curr_pos+20 === next_pos) || 
        (curr_pos-16 === next_pos) ||
        (curr_pos-20=== next_pos)
        );
    }

    getSrcToDestPath(curr_pos, next_pos){
        let path = [], start, end, increment;
        
        if (curr_pos > next_pos){
            start = next_pos;
            end = curr_pos;
        }

        else {
            start = curr_pos;
            end = next_pos;
        }

        if (next_pos % 8 === curr_pos % 8){
            start += 8;
            increment = 8;
        }
        else if (next_pos % 10 === curr_pos % 10) {
            start += 10;
            increment = 10;
        }

        for (let i=start;i<end;i+=increment){
            path.push(i);
        }

        return path;

    }
}