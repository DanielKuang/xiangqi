import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    }

    isMovePossible(curr_pos, next_pos, isDestEnemyOccupied, isSelfAcrossRiver) {
        if (this.player === 1) {
            if (isSelfAcrossRiver === true) {
                return ((curr_pos - 9 === next_pos) || (curr_pos - 1 === next_pos) || (curr_pos + 1 === next_pos)
                );
            }
            else {
                return (curr_pos - 9 === next_pos);
            }
        }

        if (this.player === 2) {
            if (isSelfAcrossRiver === true) {
                return ((curr_pos + 9 === next_pos) || (curr_pos - 1 === next_pos) || (curr_pos + 1 === next_pos));
            }

            else {
                return (curr_pos + 9 === next_pos);
            }
        }
    }

    getSrcToDestPath(curr_pos, next_pos) {
        return [];
    }
}