var timerId = null; //variável que armazena a chamada da função timeout

function gameConfig(){
	var url = window.location.search;

	var gameLevel = url.replace("?", "");

	//1 facil -> 120 s
	//2 médio -> 60 s
	//3 dificil -> 30 s
	var time = 0;

	switch(gameLevel){
		case "1":
			time = 120;
			break;

		case "2":
			time = 60;
			break;

		case "3":
			time = 30;
			break;

		default:
			time = 120;
	}

	document.getElementById("cronometro").innerHTML = time;

	var balloonsAmount = 50;
	createBalloons(balloonsAmount);

	document.getElementById("normalBalloons").innerHTML = balloonsAmount;
	document.getElementById("poppedBalloons").innerHTML = 0;	

	countTime(time + 1);
}

function gameOver(){
	alert("Fim de jogo. Você não conseguiu estourar todos os balões a tempo.");
}

function countTime(seconds){
	seconds = seconds - 1;

	if(seconds < 0){
		clearTimeout(timerId);
		gameOver();
		return false;
	}

	document.getElementById("cronometro").innerHTML = seconds;
	
	timerId = setTimeout("countTime("+seconds+")", 1000);
}

function createBalloons(balloonsAmount){
	for(var i=0; i<balloonsAmount; i++){
		var balloon = document.createElement("img");
		balloon.src = "img/balao_azul_pequeno.png";
		balloon.style.margin = "10px";
		balloon.id = 'b'+i;
		balloon.onclick = function(){popBalloon(this)}
		document.getElementById("cenario").appendChild(balloon);	
	}
}

function popBalloon(balloon){
	var balloonId = balloon.id;
	document.getElementById(balloonId).setAttribute("onclick", "");
	document.getElementById(balloonId).src = "img/balao_azul_pequeno_estourado.png";
	points();
}

function points(){
	var normalBalloons = document.getElementById("normalBalloons").innerHTML;
	var poppedBalloons = document.getElementById("poppedBalloons").innerHTML;

	normalBalloons = parseInt(normalBalloons);
	poppedBalloons = parseInt(poppedBalloons);

	normalBalloons = normalBalloons - 1;
	poppedBalloons = poppedBalloons + 1;

	document.getElementById("normalBalloons").innerHTML = normalBalloons;
	document.getElementById("poppedBalloons").innerHTML = poppedBalloons;

	gameSituation(normalBalloons);
}

function gameSituation(normalBalloons){
	if(normalBalloons == 0){
		alert("Parabéns, você conseguiu estourar todos os balões a tempo!");
		stopGame();
	}
}

function stopGame(){
	clearTimeout(timerId);
}

