import {
	userLife,
	userDamage,
} from './components/GlobalVariables.js';

import {board} from './components/Board-Creation/Board.js';

import { createTable } from './components/Board-Visualization/CreateTable.js';
import { CreateStat } from './components/Player-Visualization/CreateStat.js';

// creating the table visually using the board data and creating the player using its data
createTable(board);
CreateStat(userLife, userDamage);

document.addEventListener('keydown', getInput);

document.addEventListener('keyup' , isPressed);

import {getInput, isPressed} from './components/Movement/Input.js';


