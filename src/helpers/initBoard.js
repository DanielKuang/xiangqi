import Pawn from '../pieces/pawn.js'
import King from '../pieces/king.js'
import Cannon from '../pieces/cannon.js'
import Queen from '../pieces/queen.js'
import Horse from '../pieces/horse.js'
import Rook from '../pieces/rook.js'
import Elephant from '../pieces/elephant.js'


export default function initBoard(){
    const tiles = Array(90).fill(null);

    for (let i=27;i<36;i+=2) {
        tiles[i] = new Pawn(2);
        tiles[i+27] = new Pawn(1);
    }

    tiles[19] = new Cannon(2);
    tiles[25] = new Cannon(2);
    tiles[19+45] = new Cannon(1);
    tiles[25+45] = new Cannon(1);

    tiles[0] = new Rook(2);
    tiles[8] = new Rook(2);
    tiles[81] = new Rook(1);
    tiles[89] = new Rook(1);

    tiles[1] = new Horse(2);
    tiles[7] = new Horse(2);
    tiles[1+81] = new Horse(1);
    tiles[7+81] = new Horse(1);

    tiles[2] = new Elephant(2);
    tiles[6] = new Elephant(2);
    tiles[2+81] = new Elephant(1);
    tiles[6+81] = new Elephant(1);

    tiles[3] = new Queen(2);
    tiles[5] = new Queen(2);
    tiles[3+81] = new Queen(1);
    tiles[5+81] = new Queen(1);

    tiles[4] = new King(2);
    tiles[4+81] = new King(1);

    return tiles;

}