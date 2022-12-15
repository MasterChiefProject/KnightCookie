let userLife = 200;
let userDamage = 5;
let boardRows = 0;
let boardCols = 0;
let moveAbility = 1;
const player = "<img src=\"assets/images/cookie.png\" width=\"25px\" height=\"25px\"/>"

let monstersJson = '{ "monsters" : [' +
'{ "id":"0" , "name":"Broccoli" , "img":"assets/images/broccoli.png" , "life":"80" , "damage":"25" },' +
'{ "id":"1" , "name":"Carrot" , "img":"assets/images/carrot.gif" , "life":"120" , "damage":"5" },' +
'{ "id":"2" , "name":"Beetroot" , "img":"assets/images/beetroot.png" , "life":"100" , "damage":"20" },' +
'{ "id":"3" , "name":"Pepper" , "img":"assets/images/pepper.png" , "life":"110" , "damage":"45" },' +
'{ "id":"4" , "name":"Spinach" , "img":"assets/images/spinach.jpg" , "life":"160" , "damage":"35" },' +
'{ "id":"5" , "name":"Avocado" , "img":"assets/images/avocado.png" , "life":"170" , "damage":"40" },' +
'{ "id":"6" , "name":"Walnuts" , "img":"assets/images/walnut.webp" , "life":"70" , "damage":"50" },' +
'{ "id":"7" , "name":"Apple" , "img":"assets/images/apple.webp" , "life":"300" , "damage":"30" },' +
'{ "id":"8" , "name":"Gym" , "img":"assets/images/gym.png" , "life":"200" , "damage":"75" },' +
'{ "id":"9" , "name":"Protein Bar" , "img":"assets/images/proteinbar.png" , "life":"100" , "damage":"140" } ]}';

const obj = JSON.parse(monstersJson);

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
			const randItem = Math.floor(Math.random() * 10);
			board[i][j] = "<img src=\"assets/images/questionMark.png\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"item\"> item </span> <span style=\"visibility: hidden;\"; class=\"number\">" + obj.monsters[randItem].id + "</span>";
		}else if(randNum == 3){
			const randMon = Math.floor(Math.random() * 10);
			board[i][j] = "<img src=\"assets/images/questionMark.png\" width=\"25px\" height=\"25px\" style=\"position:absolute\"/> <span style=\"visibility: collapse;\"; class=\"mosnter\"> monster </span> <span style=\"visibility: hidden;\"; class=\"number\">" + obj.monsters[randMon].id + "</span>";
		}else{
			board[i][j] = "";
		}
	}
}
board[0][0] = player;
board[boardSize-1][boardSize-1] = "finish line";

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
createTable(board);

function typeCheck(rows, cols)
{
	if( board[rows][cols+1].includes("class=\"mosnter\""))
	{
		let id = parseInt(board[rows][cols+1].replace(/\D/g,'').slice(3,4));
		fight(id);
	} 
}


function stepLeft(rows,cols)
{
	if(moveAbility){
		if(cols===0)
		{
			return;
		}

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
		typeCheck(rows,cols);
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
		board[rows][cols]="";
		board[rows+1][cols]=player;
		boardRows++;
	}
}

let pressed = false; 
document.addEventListener('keydown', function(event) {
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
})

document.addEventListener('keyup' , function(event) {
    pressed = false;
})

function fight(i){
	moveAbility = 0;
	let monsterLife = obj.monsters[i].life;
	let monsterDamage = obj.monsters[i].damage;
	function fightArgmnt(){
		setTimeout(function() {
			document.getElementById("fight").innerHTML = "<div class=\"fightArgmntLeft\">Player Life: " + userLife + "<br /><img src=\"assets/images/cookie.png\" height=\"50px\" /><br />Power: " + userDamage + "</div><div class=\"fightArgmntRight\">Monster Life: " + monsterLife + "<br /><img src=\"" + obj.monsters[i].img + "\" height=\"50px\" /><br />Power: " + monsterDamage + "</div>";
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
		}, 250)
	}
	let arg = fightArgmnt();
	if(arg === 0){
		return 0;
	}
	return 1;
}


