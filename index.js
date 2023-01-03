import {
	userLife,
	userDamage,
	boardSize,
	boardRows,
	boardCols,
	moveAbility,
	pressed,
	player,
	finishLine,
	setUserLife,
	setUserDamage,
	setBoardRows,
	setBoardCols,
	setMoveAbility,
	setPressed,
	createStat
} from './components/GlobalVariables.js';

import {monstersJson, objMonster} from './components/JSON/Monsters.js';

import {itemsJson, objItem} from './components/JSON/Items.js';


// Create the board as a boardSize x boardSize two-dimensional array
let board = new Array(boardSize);
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
					board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"mosnter\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objMonster.monsters[randMonster].id + "</span>";
			}
			else
			{
				const randMonster = Math.floor(Math.random() * 6)+4;

				board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"mosnter\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objMonster.monsters[randMonster].id + "</span>";
			}
		}else{
			board[i][j] = "";
		}
	}
}
board[0][0] = player;
board[boardSize-1][boardSize-1] = finishLine;
//////////////////////////////---VARIABLES---//////////////////////////////



//////////////////////////////------MAIN-----//////////////////////////////
createTable(board);

document.addEventListener('keydown', getInput);

document.addEventListener('keyup' , isPressed);
//////////////////////////////------MAIN-----//////////////////////////////

//////////////////////////////---FUNCTIONS---//////////////////////////////
function isPressed() {
	setPressed(false); 
}

function getInput(event) {
    if (pressed) return;
   	setPressed(true);

	document.getElementById("table").remove();
	
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "ש") 
		stepLeft(boardRows, boardCols);
	

    else if (event.key === "ArrowRight" || event.key === "d" || event.key === "ג")  
		stepRight(boardRows, boardCols);
	

    else if (event.key === "ArrowUp" || event.key === "w" || event.key === "'") 
		stepUp(boardRows,boardCols);
	

    else if (event.key === "ArrowDown" || event.key === "s" || event.key === "ד") 
		stepDown(boardRows,boardCols);

	createTable(board);
}


function createTable(tableData) {
	let table = document.createElement('table');
	table.setAttribute("id","table");

	let tableBody = document.createElement('tbody');


	tableData.forEach(function(rowData) {
	  let row = document.createElement('tr');

	  rowData.forEach(function(cellData) {
		let cell = document.createElement('td');

		cell.innerHTML = "<div style=\"display:flex; flex-direction:column; justify-content:center; align-items:center;\">" + cellData + "</div>";
		row.appendChild(cell);
	  });

	  tableBody.appendChild(row);
	});
	table.appendChild(tableBody);
	document.getElementById('game').appendChild(table);
}

function typeCheck(rows, cols, i ,j)
{
	if(board[rows+i][cols+j].includes("finishLine.webp"))
	{
		setTimeout(function(){
		alert("Congratulations! You have finished the game succesfully!");}
		,10);
		document.getElementById("stats").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Have Won The Game!"  + "</div>";
		let btn = document.getElementById("refresh-button-stats");
		btn.removeAttribute("hidden");
		btn.innerHTML = "Play Again";
		setMoveAbility(0);
	}
	if(board[rows+i][cols+j].includes("class=\"mosnter\""))
	{
		let id = parseInt(board[rows+i][cols+j].replace(/\D/g,'').slice(4,5));
		fight(id);
		return;
	} 
	if( board[rows+i][cols+j].includes("class=\"item\""))
	{
		let id = parseInt(board[rows+i][cols+j].replace(/\D/g,'').slice(4,5));
		supply(id);
		return;
	} 
}

function stepLeft(rows,cols)
{
	if(moveAbility){
		if(cols===0)
		{
			return;
		}
		typeCheck(rows,cols,0,-1);
		board[rows][cols]="";
		board[rows][cols-1]=player;
		setBoardCols(boardCols - 1);
	}
}

function stepRight(rows,cols)
{
	if(moveAbility){
		if(cols === (boardSize - 1))
		{
			return;
		}
		typeCheck(rows,cols,0,1);
		board[rows][cols]="";
		board[rows][cols+1]=player;
		setBoardCols(boardCols + 1);
	}
}

function stepUp(rows,cols)
{
	if(moveAbility){
		if(rows===0)
		{
			return;
		}
		typeCheck(rows,cols,-1,0);
		board[rows][cols]="";
		board[rows-1][cols]=player;
		setBoardRows(boardRows - 1);
	}
}

function stepDown(rows,cols)
{
	if(moveAbility){
		if(rows===(boardSize - 1))
		{
			return;
		}
		typeCheck(rows,cols,1,0);
		board[rows][cols]="";
		board[rows+1][cols]=player;
		setBoardRows(boardRows + 1);
	}
}

import {fight} from './components/Fight/Fight.js';
import {supply} from './components/Item/Item.js';
//////////////////////////////---FUNCTIONS---//////////////////////////////
