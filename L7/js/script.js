// Globala konstanter och variabler
// Arrayer med nummer för bilder samt tillhörande namn och beskrivning
const allNrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];//array med 40 siffror

//Knappar
var newGameBtn;// referens till start knappen med id="newGameBtn"
var newTilesBtn;//referens till nya brickor knappen med id="newTilesBtn"
var msgElem;//referens för påäng result/ meddelande till användaren med id "message"
var infoOutput;//referens till plannen med info om spelet id = "userInfo"
var resultOutput;//referens till rätt/fel svar med id="s*mark"

var dropElems;//referens till tile/div elements i spelplanen
var dragElems; // det element som dras 
var tileElems;// referens till toma brickor

// Initiera globala variabler och händelsehanterare
function init() {
    newGameBtn = document.getElementById("newGameBtn");//start knappen
    newTilesBtn = document.getElementById("newTilesBtn");//new tiles knappen
    msgElem = document.getElementById("message");//meddelande till användaren
    infoOutput = document.getElementById("userInfo");// referens till info om spelet

    dropElems = document.getElementById("board").getElementsByClassName("tile");//referens till drop zones brickorna

    tileElems = document.getElementById("newTiles").getElementsByClassName("tile");//referens till elementen för rutorna


    /* ----------------Händelsehanterare---------- */

    // drag-and-drop för element - tiles (dropElems)
    for (let i = 0; i < tileElems.length; i++) {
        tileElems[i].draggable = true;//element är dragbara
        tileElems[i].addEventListener("dragstart", handleDragstart);
        tileElems[i].addEventListener("dragend", handleDragend);
    }


    //kod för start och nybricka buttons  
    newGameBtn.addEventListener("click", newGame);
    newTilesBtn.addEventListener("click", newNumbers);

    // Aktivera/inaktivera knappar
    newGameBtn.disabled = false;
    newTilesBtn.disabled = true;
}//slut init
window.addEventListener("load", init); //init aktiveras då sidan är inladdad

//initiera spelet  
function newGame() {

    // Aktivera/inaktivera knappar
    newGameBtn.disabled = true;
    newTilesBtn.disabled = false;
}//slut newGame()

//toma brickor fyllas med nummer
function newNumbers() {

    //slumpar 4 siffror bland allNrs*/
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * allNrs.length);//
        let ix = allNrs[r];//nytt nummer sparas i variabeln 
        allNrs.splice(r, 1);
        tileElems[i].innerHTML = ix;//brickans nummer läggas in i elementen
        console.log(ix);

        //Ändra en class
        tileElems[i].classList.remove("empty");
        tileElems[i].classList.add("filled");
    }


}
//när en bricka börjas dras Läggas händelsehanterare på drop zones
function handleDragstart(e) {
    dragElems = this;
    e.dataTransfer.setData("text", this.innerHTML);//spara texten 

    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].addEventListener("dragover", handleDropZone);
        //dropZones[i].addEventListener("dragenter", handleDropZone);
        dropElems[i].addEventListener("dragleave", handleDropZone);
        dropElems[i].addEventListener("drop", handleDropZone);
    }


    msgElem.innerHTML = "En box dras";
    console.log(handleDragstart);
}


//funktion som kopplat till de toma rutorna(dropzones). Brickan kan släppas här
function handleDropZone(e) {
    e.preventDefault();
    //ändrar färgen på drop-zone ruta när man aktivera den
    if (e.type == "dragover") {
        this.style.backgroundColor = "#9c9";
    }
    else if (e.type == "dragleave") {
        this.style.backgroundColor = "";
    } else if (e.type == "drop") {
        this.style.backgroundColor = "";
        this.innerHTML = e.dataTransfer.getData("text");
        this.classList.remove("empty");
        this.classList.add("filled");
        dragElems.classList.remove("filled");
        dragElems.classList.add("empty");
        dragElems.innerHTML = "";
    }

    msgElem.innerHTML = "";
    console.log(handleDropZone);
}

//drag-and-drop avslutas
function handleDragend(e) {
    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].removeEventListener("dragover", handleDropZone);
        //dropZones[i].addEventListener("dragenter", handleDropZone);
        dropElems[i].removeEventListener("dragleave", handleDropZone);
        dropElems[i].removeEventListener("drop", handleDropZone);
    }


    msgElem.innerHTML = " Boxen dras inte längre ";
    console.log(handleDragend);
}

//sluta spelet
function endGame() {


    // Aktivera/inaktivera knappar
    newGameBtn.disabled = false;
    newTilesBtn.disabled = true;
}//slut endGame