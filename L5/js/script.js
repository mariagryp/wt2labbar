// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const allCarImgs = [
	[], // Inga bilar för index 0
	["ferrari_up.png", "ferrari_right.png", "ferrari_down.png", "ferrari_left.png"],
	["jeep_up.png", "jeep_right.png", "jeep_down.png", "jeep_left.png"],
	["vw_up.png", "vw_right.png", "vw_down.png", "vw_left.png"]
];
var carImgs;			// Array med vald bil (någon av ovanstående arrayer)
// Array med filnamn för bilderna med bilen
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
var carMenu;			// Referens till menyn för att välja bil

/* ===== Tillägg i labben ===== */
var pigElem; // referens till img-taggen för vildsvinet
var pigTimerRef = null; //referens till timer för att bestämma när en ny vildsvin ska dyka upp. Timer startas inte när sidan laddas = null;

const pigDuration = 2000;//ska användas i timer då det ska vara 2 sekunders interval då en ny svin dyker upp igen 

var pigNr;//nummer för aktuell gris)

var hitCounter;//antal träffar

var pigNrElem;//referans till pigNr
var hitCounterElem;//referans till element hitCounter

var catchedPig;// variabel till träffat gris

// --------------------------------------------------
// Bilderna laddas in i förväg, så att alla bilder finns i webbläsarens cache, när de behövs
for (let i = 0; i < allCarImgs.length; i++) {
	for (let j = 0; j < allCarImgs[i].length; j++) {
		let img = new Image();
		img.src = "img/" + allCarImgs[i][j];
	}
}
{ // Förladda "smack"-bilden
	let img = new Image();
	img.src = "img/smack.png";
}
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
	// Referenser till element i gränssnittet
	boardElem = document.getElementById("board");
	carElem = document.getElementById("car");
	startBtn = document.getElementById("startBtn");
	stopBtn = document.getElementById("stopBtn");
	carMenu = document.getElementById("carMenu");
	// Lägg på händelsehanterare
	document.addEventListener("keydown", checkKey);
	// Känna av om användaren trycker på tangenter för att styra bilen
	startBtn.addEventListener("click", startGame);
	stopBtn.addEventListener("click", stopGame);
	carMenu.addEventListener("change", chooseCar);
	// Aktivera/inaktivera knappar
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;
	// Första bil
	carImgs = allCarImgs[1];
	carElem.src = "img/" + carImgs[carDir];

	/* === Tillägg i labben === */
	pigElem = document.getElementById("pig");//referens till img-taggen med id "pig"

	pigNrElem = document.getElementById("pigNr");
	hitCounterElem = document.getElementById("hitCounter");

} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) { // Anropas vid keydown
	let k = e.key;
	switch (k) {
		case "ArrowLeft":
		case "z":
			e.preventDefault();
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case "ArrowRight":
		case "-":
			e.preventDefault();
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // Slut checkKey
// --------------------------------------------------
// Val av bil genom menyn. Array med valda bildfiler läggs in i carImgs
function chooseCar() {
	carImgs = allCarImgs[this.selectedIndex];
	carElem.src = "img/" + carImgs[carDir];
	this.selectedIndex = 0;
} // Slut chooseCar
// --------------------------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carMenu.disabled = true;
	document.activeElement.blur(); // Knapparna sätts ur focus, så att webbsidan kommer i fokus igen
	// Detta behövs för att man ska kunna känna av händelsen keydown i Firefox.
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();

	/* === Tillägg i labben === */
	//kod för räknare för antal grisar som tagits fram samt antal gånger man kört på dem
	//nollställs från början
	pigNr = 0;
	hitCounter = 0;
	pigNrElem.innerHTML = 0;
	hitCounterElem.innerHTML = 0;

	catchedPig = true;// markerar att ingen kontroll ska göras förrän första grisen tagits fram.

	pigTimerRef = setTimeout(newPig, pigDuration);//funktion newPig(vildsvin visas) startas först efter 2 sekunder efter man startar spelet
} // Slut startGame

// --------------------------------------------------

// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;

	/* === Tillägg i labben === */
	if (pigTimerRef != null) clearTimeout(pigTimerRef);//timern för griserna stoppas 
	pigElem.style.visibility = "hidden";//griserna stoppaas att dyka upp

} // Slut stopGame
// --------------------------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar, timerStep);

	/* === Tillägg i labben === */
	//ett anrop av checkHit
	checkHit();

} // Slut moveCar
// --------------------------------------------------

/* ===== Tillägg av nya funktioner i labben ===== */
//Ett nytt vildsvin
function newPig() {
	//en ny gris skapas ifall pigNr är mindre än 10.
	if (pigNr < 10) {
		let xLimit = boardElem.offsetWidth - pigElem.offsetWidth - 20;
		let yLimit = boardElem.offsetHeight - pigElem.offsetHeight - 20;
		let x = Math.floor(xLimit * Math.random()) + 10;
		let y = Math.floor(yLimit * Math.random()) + 10;

		pigElem.style.left = x + "px";
		pigElem.style.top = y + "px";

		//lägga in bilden på grisen igen, då en ny gris skapas
		pigElem.src = "img/pig.png";

		pigElem.style.visibility = "visible";

		//funktion newPig(vildsvin visas) startas först efter 2 sekunder efter man startar spelet. En ny gris kommer om 2 sekunder
		pigTimerRef = setTimeout(newPig, pigDuration);

		catchedPig = false;//grisen är inte träffat än

		pigNr++;//antalet visade gris ökar med 1
		pigNrElem.innerHTML = pigNr;//visar antalet träffade grisar

	} else {
		stopGame();
	}

}
// Slut newPig
// --------------------------------------------------

//Kontrollera om bilen krockar med vildsvinet
function checkHit() {
	//kontrollera om grisen redan träffad, då ska du inte kontrollera träff igen
	if (catchedPig) {
		return;
	}

	//bilens respektive grisens bredd
	let cSize = carElem.offsetWidth;// bilens bredd
	let pSize = pigElem.offsetWidth;// grisens bredd

	//bilens respektive grisens left och top i variablerna
	//parseInt tar bort enheten px
	let cL = parseInt(carElem.style.left);
	let cT = parseInt(carElem.style.top);
	let pL = parseInt(pigElem.style.left);
	let pT = parseInt(pigElem.style.top);

	// villkoret som ska kontrolleras, för att se om vi har en krock.
	if (
		cL + 10 < pL + pSize &&
		cL + cSize - 10 > pL &&
		cT + 10 < pT + pSize &&
		cT + cSize - 10 > pT) {
		clearTimeout(pigTimerRef);
		//bilden för grisen byttas mot en smack.png då dem krockas 
		pigElem.src = "img/smack.png";

		//Starta timern för att ta fram en ny gris efter den tid som anges i pigDuration
		pigTimerRef = setTimeout(newPig, pigDuration);

		//Vildsvinet är nu träffat.
		catchedPig = true;

		//hantera räknaren för antal träffar.
		hitCounter++;
		hitCounterElem.innerHTML = hitCounter;
	}
}
// Slut checkHit
// --------------------------------------------------
