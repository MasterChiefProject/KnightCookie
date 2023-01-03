import {userLife, userDamage, SetUserLife,SetMoveAbility} from '../GlobalVariables.js';
import {objMonster} from '../JSON/Monsters.js';
import {CreateStat } from '../Player-Visualization/CreateStat.js';

export function fight(id){
	SetMoveAbility(0);
	let monsterLife = objMonster.monsters[id].life;
	let monsterDamage = objMonster.monsters[id].damage;
	function fightArgmnt(){
		setTimeout(function() {
			document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "<div class=\"fightArgmntLeft\">Player Life: " + userLife + "<br /><img src=\"assets/images/cookie.webp\" height=\"50px\" /><br />Damage: " + userDamage + "</div><div class=\"fightArgmntRight\">Monster Life: " + monsterLife + "<br /><img src=\"" + objMonster.monsters[id].img + "\" height=\"50px\" /><br />Damage: " + monsterDamage + "</div>" + "</div>";
			SetUserLife(userLife - monsterDamage);
			monsterLife -= userDamage;
			if (userLife > 0 && monsterLife > 0) {
				fightArgmnt();
			}
			else if(userLife > 0){
				SetMoveAbility(1);
				document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Won!" + "</div>";
				CreateStat(userLife, userDamage);
				return 1;
			}
			else{
				SetMoveAbility(0);
				document.getElementById("fight").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "You Lost!"  + "</div>";
				let btn = document.getElementById("refresh-button-war");
				btn.removeAttribute("hidden");
				btn.innerHTML = "Play Again";
				CreateStat(0, 0);
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