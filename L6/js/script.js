// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];	// Pris för tilläggen
var formElem;		// Referens till elementet med hela formuläret
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris.
function init() {
	formElem = document.getElementById("booking");

	formElem.city.addEventListener("blur", checkCity);

	// Händelsehanterare för textfält som ska kontrolleras
	for (let i = 0; i < formElem.roomType.length; i++) {
		//click händelse läggas till på rumsknapparna)
		formElem.roomType[i].addEventListener("click", checkIfFamilyRoom);

		//Händelsehanterare calculate kostnader
		formElem.roomType[i].addEventListener("click", calculateCost);

		//skriver ut kostnaderna till höger om texten för rumstyperna 
		formElem.roomType[i].nextSibling.textContent += " (" + roomPrice[i] + " kr)";
	}
	//skriver ut kostnaderna till höger om texten för tillägg 
	for (let i = 0; i < formElem.facility.length; i++) {
		formElem.facility[i].nextSibling.textContent += " (" + facilityPrice[i] + " kr)";

		//Händelsehanterare calculate kostnader
		formElem.facility[i].addEventListener("click", calculateCost);
	}

	formElem.nrOfNights.addEventListener("change", calculateCost);


	// Händelsehanterare för kampanjkod



	checkIfFamilyRoom();//anrop av checkIfFamilyRoom.
	calculateCost();//anrop av calculateCost

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
		formElem.facility[2].checked = false;//bocken i sjöutsikt tas bort vid valdav familjerum,
	} else {
		formElem.persons.disabled = true;//Menyn för personer aktiveras
		formElem.persons.parentNode.style.color = "#999";//grå label
		formElem.facility[2].disabled = false;//Alternativet Sjöutsikt aktiveras
		formElem.facility[2].parentNode.style.color = "#000";//svart label

	}
}

//Beräkna total kostnad
function calculateCost() {
	let price = 0;

	//en loop där du går igenom radioknapprna för rumstyp.
	for (let i = 0; i < formElem.roomType.length; i++) {
		if (formElem.roomType[i].checked) {
			price = roomPrice[i];
			break;
		}
	}

	//en loop där du går igenom kryssrutorna för tilläggen.
	for (let i = 0; i < formElem.facility.length; i++) {
		if (formElem.facility[i].checked) {
			price += facilityPrice[i];
		}
	}
	let nrOfNights = formElem.nrOfNights.value;
	totalCost.innerHTML = nrOfNights * price;
}

//function check city bokstäver konverteras till versaler.
function checkCity() {
	let city = this.value;//lokal variable för cit element
	city = city.toUpperCase();//Konvertera innehållet i variabeln city till versaler
	this.value = city;
}