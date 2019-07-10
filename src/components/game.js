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
            indxOfSelectedPiece: null
        }
    }


    



}