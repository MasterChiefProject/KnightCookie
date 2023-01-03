import { board } from "../Board-Creation/Board.js";
import { boardSize } from "../GlobalVariables.js";
import {objMonster} from '../JSON/Monsters.js';
import {objItem} from '../JSON/Items.js';

export function RevealTable(){
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {

            if(board[i][j].includes("cookie.webp"))
            {
                board[i][j] = "";
                continue;
            }
                
            if(board[i][j].includes("class=\"monster\""))
            {
                let id = parseInt(board[i][j].replace(/\D/g,'').slice(4,5));
                board[i][j] = `<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">`  + `<img src=${objMonster.monsters[id].img} width=\"35px\" height=\"35px\" style=\"position:absolute\"/>` + `</div>`;
            }

            if(board[i][j].includes("class=\"item\""))
            {
                let id = parseInt(board[i][j].replace(/\D/g,'').slice(4,5));
                board[i][j] = `<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">`  + `<img src=${objItem.items[id].img} width=\"35px\" height=\"35px\" style=\"position:absolute\"/>` + `</div>`;
            }
        }
    }
}