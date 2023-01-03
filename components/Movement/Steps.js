import { board } from "../Board-Creation/Board.js";
import { boardCols, SetBoardCols, boardRows, SetBoardRows, player,boardSize, moveAbility } from "../GlobalVariables.js";
import { NextCellCheck } from "./NextCellCheck.js";

export function stepLeft(rows,cols)
{
	if(moveAbility){
		if(cols===0)
		{
			return;
		}
		NextCellCheck(rows,cols,0,-1);
		board[rows][cols]="";
		board[rows][cols-1]=player;
		SetBoardCols(boardCols - 1);
	}
}

export function stepRight(rows,cols)
{
	if(moveAbility){
		if(cols === (boardSize - 1))
		{
			return;
		}
		NextCellCheck(rows,cols,0,1);
		board[rows][cols]="";
		board[rows][cols+1]=player;
		SetBoardCols(boardCols + 1);
	}
}

export function stepUp(rows,cols)
{
	if(moveAbility){
		if(rows===0)
		{
			return;
		}
		NextCellCheck(rows,cols,-1,0);
		board[rows][cols]="";
		board[rows-1][cols]=player;
		SetBoardRows(boardRows - 1);
	}
}

export function stepDown(rows,cols)
{
	if(moveAbility){
		if(rows===(boardSize - 1))
		{
			return;
		}
		NextCellCheck(rows,cols,1,0);
		board[rows][cols]="";
		board[rows+1][cols]=player;
		SetBoardRows(boardRows + 1); 
	}
}