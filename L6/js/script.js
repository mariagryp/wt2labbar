// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];	// Pris för tilläggen
var formElem;		// Referens till elementet med hela formuläret
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris.
function init() {
	formElem = document.getElementById("booking");


	// Händelsehanterare för textfält som ska kontrolleras
	for (let i = 0; i < formElem.roomType.length; i++) {
		formElem.roomType[i].addEventListener("click", checkIfFamilyRoom);
	}
	// Händelsehanterare för kampanjkod

	checkIfFamilyRoom();
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
//Kontrollera om familjerum är valt eller ej
function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked) {
		formElem.persons.disabled = false;//Menyn för personer aktiveras
		formElem.persons.parentNode.style.color = "#000";//svart label
		//Alternativet Sjöutsikt inaktiveras
		formElem.facility[2].disabled = true;
		formElem.facility[2].parentNode.style.color = "#999";//grå label för Sjöutsikt
	} else {
		formElem.persons.disabled = true;//Menyn för personer aktiveras
		formElem.persons.parentNode.style.color = "#999";//grå label
		formElem.facility[2].disabled = false;//Alternativet Sjöutsikt inaktiveras
		formElem.facility[2].parentNode.style.color = "#000";//svart label
	}
}