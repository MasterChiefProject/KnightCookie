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
} from '../GlobalVariables.js';

import {itemsJson, objItem} from '../JSON/Items.js';

export function supply(id){
	let itemLife = parseInt(objItem.items[id].extraLife);
	let itemDamage = parseInt(objItem.items[id].extraDamage);
	setUserLife(userLife + itemLife);
	setUserDamage(userDamage + itemDamage);
	document.getElementById("stats").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:flex-start; align-items:flex-end; padding-top:2.5rem;\">" + "<div class =\"statLeft\">HP addition: " + itemLife + "<br /><img src=\"" + objItem.items[id].img + "\" height=\"50px\" /><br />Damage addition: " + itemDamage + "</div>" + "<div class =\"statRight\"> Updated Life: " + userLife + "<br /><img src=\"assets/images/cookie.webp\" height=\"50px\" /><br />Updated Damage: " + userDamage + "</div>" + "</div>" + "</div>";
	return 1;
}