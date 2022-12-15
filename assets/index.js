//////////////////////////////---VARIABLES---//////////////////////////////
let userLife = 200;
let userDamage = 5;
let boardRows = 0;
let boardCols = 0;
let moveAbility = 1;

const player = "<img src=\"assets/images/cookie.webp\" width=\"25px\" height=\"25px\"/>"
const finishLine = "<img src=\"assets/images/finishLine.webp\" width=\"60px\" height=\"60px\"/>"
let monstersJson = '{ "monsters" : [' +
'{ "id":"0" , "name":"Broccoli" , "img":"assets/images/broccoli.webp" , "life":"80" , "damage":"25" },' +
'{ "id":"1" , "name":"Carrot" , "img":"assets/images/carrot.webp" , "life":"120" , "damage":"5" },' +
'{ "id":"2" , "name":"Beetroot" , "img":"assets/images/beetroot.webp" , "life":"100" , "damage":"20" },' +
'{ "id":"3" , "name":"Pepper" , "img":"assets/images/pepper.webp" , "life":"110" , "damage":"45" },' +
'{ "id":"4" , "name":"Spinach" , "img":"assets/images/spinach.webp" , "life":"160" , "damage":"35" },' +
'{ "id":"5" , "name":"Avocado" , "img":"assets/images/avocado.webp" , "life":"170" , "damage":"40" },' +
'{ "id":"6" , "name":"Walnuts" , "img":"assets/images/walnut.webp" , "life":"70" , "damage":"50" },' +
'{ "id":"7" , "name":"Apple" , "img":"assets/images/apple.webp" , "life":"300" , "damage":"30" },' +
'{ "id":"8" , "name":"Gym" , "img":"assets/images/gym.webp" , "life":"200" , "damage":"75" },' +
'{ "id":"9" , "name":"Protein Bar" , "img":"assets/images/proteinbar.webp" , "life":"100" , "damage":"140" } ]}';

let itemsJson = '{ "items" : [' +
'{ "id":"0" , "name":"MiniMarshmallows" , "img":"assets/images/minimarshmallows.webp" , "extraLife":"5" , "extraDamage":"5" },' +
'{ "id":"1" , "name":"CrushedCandyCanes" , "img":"assets/images/crushedcandycanes.webp" , "extraLife":"10" , "extraDamage":"10" },' +
'{ "id":"2" , "name":"Confetti" , "img":"assets/images/confetti.webp" , "extraLife":"15" , "extraDamage":"15" },' +
'{ "id":"3" , "name":"Rainbow" , "img":"assets/images/dragees.webp" , "extraLife":"30" , "extraDamage":"30" } ]}';

let pressed = false;
const objMonster = JSON.parse(monstersJson);
const objItem = JSON.parse(itemsJson);


// Create the board as a boardSize x boardSize two-dimensional array
const boardSize = 10;
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
			const randMonster = Math.floor(Math.random() * 10);
			board[i][j] = "<img src=\"assets/images/questionMark.webp\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"mosnter\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + objMonster.monsters[randMonster].id + "</span>";
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
pressed = false; 
}

function getInput(event) {
    if (pressed) return;
   	pressed = true;

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
	if( board[rows+i][cols+j].includes("class=\"mosnter\""))
	{
		let id = parseInt(board[rows+i][cols+j].replace(/\D/g,'').slice(3,4));
		fight(id);
		return;
	} 
	if( board[rows+i][cols+j].includes("class=\"item\""))
	{
		let id = parseInt(board[rows+i][cols+j].replace(/\D/g,'').slice(3,4));
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
		boardCols--;
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
		boardCols++;
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
		boardRows--;
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
		boardRows++;
	}
}

function fight(i){
	moveAbility = 0;
	let monsterLife = objMonster.monsters[i].life;
	let monsterDamage = objMonster.monsters[i].damage;
	function fightArgmnt(){
		setTimeout(function() {
			document.getElementById("fight").innerHTML = "<div class=\"fightArgmntLeft\">Player Life: " + userLife + "<br /><img src=\"assets/images/cookie.webp\" height=\"50px\" /><br />Power: " + userDamage + "</div><div class=\"fightArgmntRight\">Monster Life: " + monsterLife + "<br /><img src=\"" + objMonster.monsters[i].img + "\" height=\"50px\" /><br />Power: " + monsterDamage + "</div>";
			userLife -= monsterDamage;
			monsterLife -= userDamage;
			
			if (userLife > 0 && monsterLife > 0) {
				fightArgmnt();
			}else if(userLife > 0){
				moveAbility = 1;
				document.getElementById("fight").innerHTML = "You Won!";
				return 1;
			}else{
				moveAbility = 0;
				document.getElementById("fight").innerHTML = "You Lost!";
				return 0;
			}
		}, 750);
	}
	let arg = fightArgmnt();
	if(arg === 0){
		return 0;
	}
	return 1;
}

function supply(i){
	document.getElementById("stats").innerHTML = "hooga booga!";
	return 1;
}
//////////////////////////////---FUNCTIONS---//////////////////////////////
