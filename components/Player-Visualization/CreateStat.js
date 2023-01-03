import { userLife, userDamage } from "../GlobalVariables.js";

export function CreateStat(userLife, userDamage)
{
	document.getElementById("stats").innerHTML = "<div style=\"display:flex; flex-direction:row; justify-content:center; align-items:flex-end; padding-top:2.5rem;\">" + "<div class=\"fightArgmntLeft\">Player Life: " + userLife + "<br /><img src=\"assets/images/cookie.webp\" height=\"50px\" /><br />Damage:" + userDamage + "</div>" + "</div>";
}