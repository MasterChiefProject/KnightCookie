import {boardSize, player, finishLine}  from '../GlobalVariables.js';
import {objMonster} from '../JSON/Monsters.js';
import {objItem} from '../JSON/Items.js';

// Create the board as a boardSize x boardSize two-dimensional array
export let board = new Array(boardSize);
for (let i = 0; i < boardSize; i++) {
	board[i] = new Array(boardSize);
}
// Initialize the board with players and monsters
for (let i = 0; i < boardSize; i++) {
	for (let j = 0; j < boardSize; j++) {
		const randNum = Math.floor(Math.random() * 4) + 1;
		if(randNum == 2){
			const randItem = Math.floor(Math.random() * 4);
			board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"item\"> item </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objItem.items[randItem].id + "</span>";
		}else if(randNum == 3){
			const increasedChance=Math.floor(Math.random()*3);
			if(increasedChance!=0)
			{
					const randMonster = Math.floor(Math.random() * 4);
					board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"monster\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objMonster.monsters[randMonster].id + "</span>";
			}
			else
			{
				const randMonster = Math.floor(Math.random() * 6)+4;

				board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"monster\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objMonster.monsters[randMonster].id + "</span>";
			}
		}else{
			board[i][j] = "";
		}
	}
}
board[0][0] = player;
board[boardSize-1][boardSize-1] = finishLine;