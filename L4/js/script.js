// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const allWords = ["Borgholm", "Gränna", "Gävle", "Göteborg", "Halmstad", "Jönköping", "Kalmar", "Karlskrona", "Kiruna", "Ljungby", "Malmö", "Norrköping", "Skara", "Stockholm", "Sundsvall", "Umeå", "Visby", "Västervik", "Växjö", "Örebro"];
const allDescriptions = ["Kyrkan", "Storgatan", "Julbock", "Operan", "Picassoparken", "Sofiakyrkan", "Domkyrkan", "Rosenbom", "Stadshus", "Garvaren", "Stortorget", "Spårvagn", "Domkyrka", "Rosenbad", "Hotell Knaust", "Storgatan", "Stadsmur", "Hamnen", "Teater", "Svampen"];
// Element i gränssnittet
var startGameBtn;		// Referenser till start-knappen (button)
var checkAnswersBtn;	// Referens till knappen för att kontrollera svar (button)
var msgElem; 			// Referens till div-element för utskrift av meddelanden (div)
var wordListElem;		// Referens till listan med de åtta orden (ul-elementet)
var wordElems;			// Array med referenser till elementen för de åtta orden (li-elemnten)
var imgElems;			// Array med referenser till elementen med de fyra bilderna (img)
var answerElems;		// Array med referenser till elementen för orden intill bilderna (p)
var correctElems;		// Array med referenser till element för rätta svar (p)
var largeImgElem;		// Referens till elementet med den stora bilden (img)
// Element vid drag and drop
var dragElem;			// Det element som dras (kan vara både li och p)
// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init() {
	// Referenser till element i gränssnittet
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	msgElem = document.getElementById("message");

	wordListElem = document.getElementById("wordList").getElementsByTagName("ul")[0];//referens till den enda ul-lista. Indexeras med [0]

	//referens till alla li-elelemts.Ingen index
	wordElems = document.getElementById("wordList").getElementsByTagName("li");

	//referens till img-elementen i imgList
	imgElems = document.getElementById("imgList").getElementsByTagName("img");

	//referens för p-element för användarens svar
	answerElems = document.getElementsByClassName("userAnswer");

	//referens för p-element för rätt svar
	correctElems = document.getElementsByClassName("correctAnswer");

	//referens till den stora bilden
	largeImgElem = document.getElementById("largeImg");

	// Lägg på händelsehanterare
	startGameBtn.addEventListener("click", startGame);
	checkAnswersBtn.addEventListener("click", checkAnswers);

	//kod för händelsehanterare för att visa små/stora bilder när man pekar på bilden
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("mouseenter", showLargeImg);
		imgElems[i].addEventListener("mouseleave", hideLargeImg);
	}

	// Aktivera/inaktivera knappar

} // Slut init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------
// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame() {
	let tempNrs = allNrs.slice(0);//variabeln för en kopia av arrayen allNrs så att allNrs blir oförandrad. 
	let r;
	let words = [];//

	for (let i = 0; i < 4; i++) {
		//
		r = Math.floor(tempNrs.length * Math.random());
		ix = r;
		words.push(allWords[ix]);
		imgElems[i].src = "img/" + ix + ".jpg";
		tempNrs.splice(ix, 1);
	}


	console.log(words);
} // Slut startGame
// --------------------------------------------------
// Visa förstorad bild
function showLargeImg() {
	console.log("showLargeImg");

} // Slut showLargeImg
// --------------------------------------------------
// Ta bort förstorad bild
function hideLargeImg() {
	console.log("hideLargeImg");

} // Slut hideLargeImg
// --------------------------------------------------
// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers() {
	console.log("checkAnswers");

} // Slut checkAnswers
// --------------------------------------------------
// Spara referens till elementet som dras. Lägg på händelsehanterare för drop zones.
function dragstartWord() {

} // Slut dragstartWord
// --------------------------------------------------
// Ta bort händelsehanterare för drop zones.
function dragendWord() {

} // Slut dragendWord
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// För dragover utförs endast första raden med preventDefault.
function wordOverImg(e) { // e är Event-objektet

} // Slut wordOverImg
// --------------------------------------------------
// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// För dragover utförs endast första raden med preventDefault.
function wordOverList(e) { // e är Event-objektet

} // Slut wordOverList
// --------------------------------------------------
// Flytta tillbaks ordet till listan
function moveBackToList(word) { // word är det ord som ska flyttas tillbaks

} // Slut moveBackToList
// --------------------------------------------------