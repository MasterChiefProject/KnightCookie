var userLife = 200;
var monsterLife = 50;
var monsterDamage = 10;
var userDamage = 5;

// Create the board as a boardSize x boardSize two-dimensional array
const boardSize = 15;
let board = new Array(boardSize);
for (let i = 0; i < boardSize; i++) {
	board[i] = new Array(boardSize);
}

// Initialize the board with players and monsters
for (let i = 0; i < boardSize; i++) {
	for (let j = 0; j < boardSize; j++) {
		if (i === 0 && j === 0) {
			board[i][j] = "player";
		} else if (i === (boardSize-1) && j === (boardSize-1)) {
			board[i][j] = "finish line";
		} else {
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
}
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