import { board } from "../Board-Creation/Board.js";
import { SetMoveAbility } from "../GlobalVariables.js";
import { fight } from "../Fight/Fight.js";
import { supply } from "../Supply/Supply.js";
import { RevealTable } from "../Board-Visualization/RevealTable.js";
export function NextCellCheck(rows, cols, i ,j)
{
	if(board[rows+i][cols+j].includes("finishLine.webp"))
	{
		SetMoveAbility(0);
		document.getElementById("stats").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Have Won The Game!"  + "</div>";
		let btn = document.getElementById("refresh-button-stats");
		btn.removeAttribute("hidden");
		btn.innerHTML = "Play Again";
        RevealTable();
        return;
	}

	if(board[rows+i][cols+j].includes("class=\"monster\""))
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