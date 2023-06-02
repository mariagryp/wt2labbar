// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs =
	[
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	];
const allWords = [
	"Borgholm", "Gränna", "Gävle", "Göteborg", "Halmstad", "Jönköping", "Kalmar", "Karlskrona", "Kiruna", "Ljungby", "Malmö", "Norrköping", "Skara", "Stockholm", "Sundsvall", "Umeå", "Visby", "Västervik", "Växjö", "Örebro",];

const allDescriptions =
	["Kyrkan", "Storgatan", "Julbock", "Operan", "Picassoparken", "Sofiakyrkan", "Domkyrkan", "Rosenbom", "Stadshus", "Garvaren", "Stortorget", "Spårvagn", "Domkyrka", "Rosenbad", "Hotell Knaust", "Storgatan", "Stadsmur", "Hamnen", "Teater", "Svampen",
	];
// Element i gränssnittet
var startGameBtn; // Referenser till start-knappen (button)
var checkAnswersBtn; // Referens till knappen för att kontrollera svar (button)
var msgElem; // Referens till div-element för utskrift av meddelanden (div)
var wordListElem; // Referens till listan med de åtta orden (ul-elementet)
var wordElems; // Array med referenser till elementen för de åtta orden (li-elemnten)
var imgElems; // Array med referenser till elementen med de fyra bilderna (img)
var answerElems; // Array med referenser till elementen för orden intill bilderna (p)
var correctElems; // Array med referenser till element för rätta svar (p)
var largeImgElem; // Referens till elementet med den stora bilden (img)
// Element vid drag and drop
var dragElem; // Det element som dras (kan vara både li och p)

// --------------------------------------------------

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	// Referenser till element i gränssnittet
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	msgElem = document.getElementById("message");
	wordListElem = document.getElementById("wordList").getElementsByTagName("ul")[0];
	wordElems = document.getElementById("wordList").getElementsByTagName("li");
	imgElems = document.getElementById("imgList").getElementsByTagName("img");
	answerElems = document.getElementsByClassName("userAnswer");
	correctElems = document.getElementsByClassName("correctAnswer");
	largeImgElem = document.getElementById("largeImg");

	// Lägg på händelsehanterare
	startGameBtn.addEventListener("click", startGame);
	checkAnswersBtn.addEventListener("click", checkAnswers);
	// Går igenom de små bilderna i imgElems och lägger på två händelsehanterare på varje element
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("mouseenter", showLargeImg);
		imgElems[i].addEventListener("mouseleave", hideLargeImg);
	}
	// Går igenom alla wordElems och lägger till händelsehanterare och funktioner på varje element
	for (let i = 0; i < wordElems.length; i++) {
		wordElems[i].addEventListener("dragstart", dragstartWord);
		wordElems[i].addEventListener("dragend", dragendWord);
	}
	// Går igenom alla answerElems och lägger till händelsehanterare och funktioner på varje element
	for (let i = 0; i < answerElems.length; i++) {
		answerElems[i].addEventListener("dragstart", dragstartWord);
		answerElems[i].addEventListener("dragend", dragendWord);
	}

	// Aktivera/inaktivera knappar
	startGameBtn.disabled = false;
	checkAnswersBtn.disabled = true;
} // Slut init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad

// --------------------------------------------------

// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {
	let tempNrs = allNrs.slice(0); // Ny array med alla element från och med position 0

	let words = []; // Array för slumpade ord

	// Slumpar fyra ord och bilder
	for (let i = 0; i < 4; i++) {
		let r = Math.floor(Math.random() * tempNrs.length); // Slumpar ett tal mellan 0 och antalet element i arrayen
		let ix = tempNrs[r]; // Sparar nummer i en variabel
		words.push(allWords[ix]); // Sparar det valda ordet i words-variabeln
		imgElems[i].src = "img/" + ix + ".jpg"; // Visar den valda bilden i img-taggen
		tempNrs.splice(r, 1); // Tar bort numret från arrayen för att hindra att den upprepas
		imgElems[i].id = ix;//spara variabl ix i img-taggens id-attribut för att sedan använda ix i i funktonen checkAnswers 
	}

	// Slumpar ytterligare fyra ord
	for (let i = 0; i < 4; i++) {
		let r = Math.floor(Math.random() * tempNrs.length); // Slumpar ett tal mellan 0 och antalet element i arrayen
		let ix = tempNrs[r]; // Sparar nummer i en variabel
		words.push(allWords[ix]); // Sparar det valda ordet i words-variabeln
		tempNrs.splice(r, 1); // Tar bort numret från arrayen för att hindra att den upprepas
	}
	words.sort(); // Sorterar orden i alfabetisk ordning

	// Skriver ut slumpade ord i li-elementen
	for (let i = 0; i < wordElems.length; i++) {
		wordElems[i].innerHTML = words[i];
		wordElems[i].draggable = true;//ord är draggable
	}

	// 
	for (let i = 0; i < answerElems.length; i++) {
		answerElems[i].draggable = true;
		answerElems[i].innerHTML = "";//Rensa svar för nytt spel
		correctElems[i].innerHTML = "";//Rensa  korrekt svar för nytt spel
	}

	startGameBtn.disabled = true;
	checkAnswersBtn.disabled = false;

	msgElem.innerHTML = "";
} // Slut startGame

// --------------------------------------------------

// Visa förstorad bild
function showLargeImg() {
	largeImgElem.src = this.src;
} // Slut showLargeImg

// --------------------------------------------------

// Ta bort förstorad bild
function hideLargeImg() {
	largeImgElem.src = "img/empty.png";
} // Slut hideLargeImg

// --------------------------------------------------

// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	for (let i = 0; i < answerElems.length; i++) {
		if (answerElems[i].innerHTML == "") {
			alert("Dra först ord till alla bilder.");
			return;
		}
		for (let i = 0; i < answerElems.length; i++) {
			answerElems[i].draggable = false;
		}
		let points = 0;//antal gånger rätt svar
		for (let i = 0; i < answerElems.length; i++) {
			let ix = imgElems[i].id;
			if (answerElems[i].innerHTML == allWords[ix]) {
				points++;
			}
			correctElems[i].innerHTML = allWords[ix] + "-" + allDescriptions[ix];
		}

		startGameBtn.disabled = false;
		checkAnswersBtn.disabled = true;

		msgElem.innerHTML = "Du hade " + points + " rätt";
	}
} // Slut checkAnswers

// --------------------------------------------------

// Spara referens till elementet som dras. Lägg på händelsehanterare för drop zones.
function dragstartWord() {
	dragElem = this; // En referens till det element som användaren börjar dra
	// Går igenom imgElems och lägger på händelsehanterare och funktioner
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("dragover", wordOverImg);
		imgElems[i].addEventListener("drop", wordOverImg);
	}
	// Lägger på händelsehanterare och funktioner på listan wordListElem
	wordListElem.addEventListener("dragover", wordOverList);
	wordListElem.addEventListener("drop", wordOverList);
} // Slut dragstartWord

// --------------------------------------------------

// Ta bort händelsehanterare för drop zones.
function dragendWord() {
	// Går igenom imgElems och lägger på händelsehanterare och funktioner
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].removeEventListener("dragover", wordOverImg);
		imgElems[i].removeEventListener("drop", wordOverImg);
	}
	// Lägger på händelsehanterare och funktioner på listan wordListElem
	wordListElem.removeEventListener("dragover", wordOverList);
	wordListElem.removeEventListener("drop", wordOverList);
} // Slut dragendWord

// --------------------------------------------------

// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// För dragover utförs endast första raden med preventDefault.
function wordOverImg(e) {
	// e är Event-objektet
	e.preventDefault();
	if (e.type == "drop") {
		let dropElem = this.nextElementSibling;
		if (dropElem.innerHTML != "") { // kontrollera om det finns ord i lukan
			moveBackToList(dropElem.innerHTML);
		}
		dropElem.innerHTML = dragElem.innerHTML;
		dragElem.innerHTML = "";
	}
} // Slut wordOverImg
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// För dragover utförs endast första raden med preventDefault.
function wordOverList(e) {
	// e är Event-objektet
	e.preventDefault();
	if (e.type == "drop") {
		moveBackToList(dragElem.innerHTML);
		dragElem.innerHTML = "";
	}
} // Slut wordOverList
// --------------------------------------------------
// Flytta tillbaks ordet till listan
function moveBackToList(word) {
	// word är det ord som ska flyttas tillbaks
	for (let i = 0; i < wordElems.length; i++) {
		if (wordElems[i].innerHTML == "") {
			wordElems[i].innerHTML = word;
			break;
		}
	}
} // Slut moveBackToList
// --------------------------------------------------