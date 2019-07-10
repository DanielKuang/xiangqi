import Piece from "./piece.js"

export default class Pawn extends Piece{
    constructor(player){
        super(player, (player === 1 ? "../public/xiangqi_pieces/red_pn.png":"../public/xiangqi_pieces/black_pn.png"))
    }

    isMovePossible(curr_pos, next_pos, isAcrossRiver){
        if (this.player === 1) {
            if (isAcrossRiver===true){
                return ((curr_pos-9===next_pos) || (curr_pos-1===next_pos) || (curr_pos+1 === next_pos)
                );
            }
            else {
                return (curr_pos-9===next_pos);
            }
        }

        if (this.player === 2) {
            if (isAcrossRiver === true){
                return ((curr_pos+9===next_pos) || (curr_pos-1 === next_pos) || (curr_pos+1 === next_pos));
            }

            else {
                return (curr_pos+9 === next_pos);
            }
        }
    }

    getPathtoDest(curr_pos, next_pos){
        return [];
    }
    
}

