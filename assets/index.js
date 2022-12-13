let userLife = 200;
let monsterLife = 50;
let monsterDamage = 10;
let userDamage = 5;
let boardRows = 0;
let boardCols = 0;

let monstersJson = '{ "monsters" : [' +
'{ "id":"0" , "name":"Broccoli" , "img":"assets/images/broccoli.png" , "life":"80" , "damage":"25" },' +
'{ "id":"1" , "name":"Carrot" , "img":"assets/images/carrot.gif" , "life":"120" , "damage":"5" },' +
'{ "id":"2" , "name":"Beetroot" , "img":"assets/images/beetroot.png" , "life":"100" , "damage":"20" },' +
'{ "id":"3" , "name":"Pepper" , "img":"assets/images/pepper.png" , "life":"110" , "damage":"45" },' +
'{ "id":"4" , "name":"Spinach" , "img":"assets/images/spinach.png" , "life":"160" , "damage":"35" },' +
'{ "id":"5" , "name":"Avocado" , "img":"assets/images/avocado.png" , "life":"170" , "damage":"40" },' +
'{ "id":"6" , "name":"Walnuts" , "img":"assets/images/walnut.webp" , "life":"70" , "damage":"50" },' +
'{ "id":"7" , "name":"Apple" , "img":"assets/images/apple.webp" , "life":"300" , "damage":"30" },' +
'{ "id":"8" , "name":"Gym" , "img":"assets/images/gym.png" , "life":"200" , "damage":"75" },' +
'{ "id":"9" , "name":"Protein Bar" , "img":"assets/images/proteinbar.png" , "life":"100" , "damage":"140" } ]}';

const obj = JSON.parse(monstersJson);

// Create the board as a boardSize x boardSize two-dimensional array
const boardSize = 25;
let board = new Array(boardSize);
for (let i = 0; i < boardSize; i++) {
	board[i] = new Array(boardSize);
}

// Initialize the board with players and monsters
for (let i = 0; i < boardSize; i++) {
	for (let j = 0; j < boardSize; j++) {
		const randNum = Math.floor(Math.random() * 4) + 1;
		if(randNum == 2){
			board[i][j] = "item";
		}else if(randNum == 3){
			board[i][j] = "monster";
			const randMon = Math.floor(Math.random() * 10);
			// board[i][j] = "<img src="" + obj.monsters[randMon].img + "" /><span style="visibility: hidden;"; class="type">monster</span> <span style="visibility: hidden;"; class="number">" + obj.monsters[randMon].id + "</span>";
		}else{
			board[i][j] = "empty";
		}
	}
}
board[0][0] = "player";
board[boardSize-1][boardSize-1] = "finish line";

function stepLeft(rows,cols)
{
    if(cols===0)
    {
        return;
    }

    board[rows][cols]="empty";
    board[rows][cols-1]="player";
	boardCols--;
	console.log("left");
	console.log(boardCols);
}

function stepRight(rows,cols)
{
    if(cols === (boardSize - 1))
    {
        return;
    }

	board[rows][cols]="empty";
    board[rows][cols+1]="player";
	boardCols++;
	console.log("right");
	console.log(boardCols);
	
}

function stepUp(rows,cols)
{
    if(rows===0)
    {
        return;
    }

    board[rows][cols]="empty";
    board[rows-1][cols]="player";
	boardRows--;
	console.log("up");
	console.log(boardRows);
}

function stepDown(rows,cols)
{
    if(rows===(boardSize - 1))
    {
        return;
    }
    board[rows][cols]="empty";
    board[rows+1][cols]="player";
	boardRows++;
	console.log("down");
	console.log(boardRows);
}

let pressed = false; 
document.addEventListener('keydown', function(event) {
    if (pressed) return;
   	pressed = true;
    if (event.key === "ArrowLeft" || event.key === "a") 
     	return stepLeft(boardRows, boardCols);

    if (event.key === "ArrowRight" || event.key === "d" )  
     	return stepRight(boardRows, boardCols);

    if (event.key === "ArrowUp" || event.key === "w") 
     	return stepUp(boardRows,boardCols);

    if (event.key === "ArrowDown" || event.key === "s") 
     	return stepDown(boardRows,boardCols);
})

document.addEventListener('keyup' , function(event) {
    pressed = false;
})

console.log(board);
function myLoop() {
	setTimeout(function() {
		document.getElementById("fight").innerHTML = "<br /> Player Life: " + userLife + " | " + "Monster Life: " + monsterLife;
		userLife -= monsterDamage;
		monsterLife -= userDamage;
		if (userLife > 0 && monsterLife > 0) {
			myLoop();
		}
	}, 1000)
}
myLoop(); 