import 'React';
import CapturedPieces from './capturedPieces.js';
import GameBoard from './gameBoard.js';
import initializeBoard from '../helpers/initBoard.js';
import '../../public/css/index.css';


export default class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            tiles: initializeBoard(),
            capturedBlackPieces: [],
            capturedRedPieces: [],
            turn: 1,
            checked: false,
            status: '',
            gameEnd: false,
            winner: null,
            indxOfSelectedPiece: null,
            threatPieceIndx: null,
            blackKingIndx: 4,
            redKingIndx: 85
        }
    }


    clickHandler(i){
        const tiles = this.state.tiles.slice();

        if (gameEnd){
            this.setState({status:'The game has ended. Please click restart for another round.'});
        } 
        
        else if (indxOfSelectedPiece === null){
            if (this.state.turn !== tiles[i].player || !tiles[i]) {
                this.setState({status: "Wrong Selection. Player " + this.state.turn + ", please select your pieces."})
                if (tiles[i]) {tiles[i].style = {...tiles[i].style, backgroundColor: ''}}; 
            }
            else {
                tiles[i].style = {...tiles[i].style, backgroundColor: 'RGB(111,143,114)'};
                this.setState({status: "Make your move.", indxOfSelectedPiece: i});
            }
        }

        else if (indxOfSelectedPiece !== null) {
            if (checked){
                let kingIndx = (this.state.turn === 1 ? redKingIndx : blackKingIndx);
                if (tiles[this.state.threatPieceIndx].isMovePossible(threatPieceIndx, kingIndx)){
                    this.setState({status:'Player ' + this.state.turn + ', you\'re checked.', indxOfSelectedPiece:null})
                }
                else {
                    // check if possible first! this assumes possible.
                    let next_player = (this.state.turn === 1 ? 2 : 1);
                    let kingMoved = (indxOfSelectedPiece === kingIndx);
                    if (kingMoved) {
                        if (this.state.turn === 1){
                            this.setState({redKingIndx:i});
                        }
                        else{
                            this.setState({blackKingIndx:i});
                        }
                    }
                    this.setState({status:'', indxOfSelectedPiece: null, threatPieceIndx: null, turn: next_player});
                } 
            }

            else if (this.state.turn === tiles[i].player && tiles[i]) {
                tiles[i].style = {...tiles[i].style, backgroundColor: ''};
                this.setState({status: 'No friendly fire.', indxOfSelectedPiece: -1});
            }
            tiles[i].style = {...tiles[i].style, backgroundColor: ''};
        }
    }

    isMoveLegal(pathToDest){
        for (indx in pathToDest){
            if (this.state.tiles[indx] !== null) {
                return false;
            } 
        }
        return true;
    }


    render(){

    }



}