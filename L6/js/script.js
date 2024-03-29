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
	checkIfFamilyRoom();//anrop av checkIfFamilyRoom.
	calculateCost();//anrop av calculateCost

	formElem.city.addEventListener("blur", checkCity);//Händelsehanterare för ort fältet
	formElem.zipcode.addEventListener("blur", checkField);//Händelsehanterare för zipcode fältet
	formElem.telephone.addEventListener("blur", checkField);//Händelsehanterare telephone fältet

	// Händelsehanterare för kampanjkod
	formElem.campaigncode.addEventListener("focus", checkCampaign);
	formElem.campaigncode.addEventListener("keyup", checkCampaign);
	formElem.campaigncode.addEventListener("blur", endCheckCampaign);
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
	let nrOfNights = formElem.nrOfNights.value;//indata of numbers of nights
	totalCost.innerHTML = nrOfNights * price;//räknar priset för valda nätter
}

// bokstäver konverteras till versaler i Ort fältet
function checkCity() {
	let city = this.value;//lokal variable för cit element
	city = city.toUpperCase();//Konvertera innehållet i variabeln city till versaler
	this.value = city;//konverterat 
}

//Kontrollera fält med postnummer och telefonnummer
function checkField() {
	const fieldNames = ["zipcode", "telephone"];
	//array med regulära uttryck för fälten
	const re = [
		/^\d{3} ?\d{2}$/, //postnummer
		/^\d{1,3}[-/ ]?\d{5,8}$/ //Telefonnumer
	];
	//array med felmeddelanden
	const errMsg = [
		"Postnummer måste bestå av fem siffror.",
		"Telefonnumer måste börja med 0:a och följas av 6-11 siffror."
	];
	let ix = fieldNames.indexOf(this.name);//index till re och errMsg
	let errMsgElem = this.nextElementSibling;//element för felmeddelande
	errMsgElem.innerHTML = "";
	if (!re[ix].test(this.value)) {
		errMsgElem.innerHTML = errMsg[ix];
		return false;// fel i fältet
	} else {
		return true; //fältet är OK
	}
}//slut checField

//Kontrollera kampanjkod
function checkCampaign() {
	/* En kampanjkod ska bestå av tre bokstäver, ett bindestreck, två siffror, ett bindestreck, en bokstav och en siffra, t.ex. ABC-12-D3. */
	let re = /^[A-Z]{3}-\d{2}-[A-Z]{1}\d{1}$/i;
	//ändra färge av input element beroende av input data
	if (re.test(this.value)) this.style.backgroundColor = "#6F9";
	else this.style.backgroundColor = "#F99";
}// slut checkCampaign

//avslutar kontrollen av kampanjkoden.
function endCheckCampaign() {
	this.style.backgroundColor = "";
	let campaignCode = this.value;//variabeln för campaign fälte
	campaignCode = campaignCode.toUpperCase();//Ändra innehållet i textfältet till endast versaler för bokstäver
	this.value = campaignCode;//ändrat innehålet
} 