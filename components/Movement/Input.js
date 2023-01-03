
import { board } from "../Board-Creation/Board.js";
import { boardRows, boardCols, pressed, SetPressed } from "../GlobalVariables.js";
import { stepLeft, stepRight, stepDown, stepUp} from "./Steps.js";
import { createTable } from "../Board-Visualization/CreateTable.js";

export function isPressed() {
	SetPressed(false); 
}

export function getInput(event) {
    if (pressed) return;
   	SetPressed(true);

	document.getElementById("table").remove();
	
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A" || event.key === "ש") 
		stepLeft(boardRows, boardCols);
	

    else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D"  || event.key === "ג")  
		stepRight(boardRows, boardCols);
	

    else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W" || event.key === "'") 
		stepUp(boardRows,boardCols);
	

    else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S"  || event.key === "ד") 
		stepDown(boardRows,boardCols);

	createTable(board);
}