let userLife = 200;
let monsterLife = 50;
let monsterDamage = 10;
let userDamage = 5;

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
		}else{
			board[i][j] = "empty";
		}
	}
}
board[0][0] = "player";
board[boardSize-1][boardSize-1] = "finish line";

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