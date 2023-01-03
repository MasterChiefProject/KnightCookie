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

import {monstersJson, objMonster} from '../JSON/Monsters.js';

export function fight(id){
	setMoveAbility(0);
	let monsterLife = objMonster.monsters[id].life;
	let monsterDamage = objMonster.monsters[id].damage;
	function fightArgmnt(){
		setTimeout(function() {
			document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "<div class=\"fightArgmntLeft\">Player Life: " + userLife + "<br /><img src=\"assets/images/cookie.webp\" height=\"50px\" /><br />Damage: " + userDamage + "</div><div class=\"fightArgmntRight\">Monster Life: " + monsterLife + "<br /><img src=\"" + objMonster.monsters[id].img + "\" height=\"50px\" /><br />Damage: " + monsterDamage + "</div>" + "</div>";
			setUserLife(userLife - monsterDamage);
			monsterLife -= userDamage;
			if (userLife > 0 && monsterLife > 0) {
				fightArgmnt();
			}else if(userLife > 0){
				setMoveAbility(1);
				document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Won!" + "</div>";
				createStat(userLife, userDamage);
				return 1;
			}else{
				setMoveAbility(0);
				document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Lost!"  + "</div>";
				let btn = document.getElementById("refresh-button-war");
				btn.removeAttribute("hidden");
				btn.innerHTML = "Play Again";
				createStat(0, 0);
				return 0;
			}
		}, 500);
	}
	let arg = fightArgmnt();
	if(arg === 0){
		return 0;
	}
	return 1;
}