// Globala konstanter och variabler
// Array med nummer
const allNrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

// Globala variabler
var newGameBtn;// referens till start knappen med id="newGameBtn"
var newTilesBtn;//referens till nya brickor knappen med id="newTilesBtn"
var msgElem;//referens för påäng result/ meddelande till användaren med id "message"
var infoOutput;//referens till plannen med info om spelet id = "userInfo"
var resultOutput;//referens till rätt/fel svar med id="s*mark"
var dropElems;// Array med referenser till element för "drop zones"
var dragElems; // det element som dras 
var tileElems;// referens till toma brickor
let dragTile; // Elementet som användaren börjar dra

let dropCount = 0;// variabel för att kontollera antal släppta brickor


/* ---------------------init------------------------------- */

// Initiera globala variabler och händelsehanterare
function init() {
    newGameBtn = document.getElementById("newGameBtn");//start knappen
    newTilesBtn = document.getElementById("newTilesBtn");//new tiles knappen
    msgElem = document.getElementById("message");//meddelande till användaren
    infoOutput = document.getElementById("userInfo");// referens till info om spelet
    dropElems = document.getElementById("board").getElementsByClassName("tile");//referens till drop zones brickorna
    dragElems = document.getElementById("newTiles").getElementsByClassName("tile");//referens till elementen för rutorna
    dragBox = document.getElementById("newTiles").getElementsByClassName("empty");
    /* ----------------Händelsehanterare---------- */
    for (let i = 0; i < dragElems.length; i++) {
        dragElems[i].addEventListener("dragstart", dragStart);
        dragElems[i].addEventListener("dragend", dragEnd);
    }
    //kod för start och nybricka buttons  
    newGameBtn.addEventListener("click", newGame);
    newTilesBtn.addEventListener("click", newNumbers);

    // Aktivera/inaktivera knappar
    newGameBtn.disabled = false;
    newTilesBtn.disabled = true;
}//slut init
window.addEventListener("load", init); //init aktiveras då sidan är inladdad

/* ---------------------newGame------------------------------- */

//initiera spelet  
function newGame() {
    // Aktivera/inaktivera knappar
    newGameBtn.disabled = true;
    newTilesBtn.disabled = false;

    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].innerHTML = "";
        dropElems[i].classList.remove("filled");
        dropElems[i].classList.add("empty");
    }
}//slut newGame()

/* ---------------------newNumbers------------------------------- */

//toma brickor fylls med slumpade nummer
function newNumbers() {
    //slumpar 4 siffror bland allNrs*/
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * allNrs.length);//
        let ix = allNrs[r];//nytt nummer sparas i variabeln 
        allNrs.splice(r, 1);//ta bort ett num som är redan vald
        dragElems[i].innerHTML = ix;//nummret löggas in i 
        //Ändra en class
        dragElems[i].classList.remove("empty");
        dragElems[i].classList.add("filled");
        dragElems[i].draggable = true;
    }
    newTilesBtn.disabled = true;
}

/* ---------------------dragStart------------------------------- */

//funktion kopplas till dragElems (bricka med ett nummer som dras - dragElems)
function dragStart(e) {
    e.dataTransfer.setData("text", this.innerHTML);//spara texten 
    dragTile = this;
    //när en bricka börjar dras Läggas händelsehanterare på drop zones
    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].addEventListener("dragover", dropZone);
        //dropZones[i].addEventListener("dragenter", handleDropZone);
        dropElems[i].addEventListener("dragleave", dropZone);
        dropElems[i].addEventListener("drop", dropZone);
    }
    //console.log(dragStart);
}

/* ---------------------dropZone------------------------------- */

//funktion som kopplat till de toma rutorna(dropzones). Brickan kan släppas här
function dropZone(e) {
    e.preventDefault();
    //om ruttan är tom markeras den med annan bakgrundsfärg annars ingen bakrunsdfärg
    if (e.type == "dragover") {
        if (this.innerHTML == "") {
            this.style.backgroundColor = "#9c9";
        } else {
            this.style.backgroundColor = "";
        }
    }
    else if (e.type == "dragleave") {
        this.style.backgroundColor = "";
    } else if (e.type == "drop") {
        if (this.innerHTML == "") {
            this.style.backgroundColor = "";
            this.innerHTML = e.dataTransfer.getData("text");
            this.classList.remove("empty");
            this.classList.add("filled");
            //ändra färger på den element som drogs när den är i drop zone
            dragTile.classList.remove("filled");
            dragTile.classList.add("empty");//ändra färge på den element som drogs till empty
            dragTile.draggable = false;// Tom ruta kan inte dras efter att brickan flyttats till tavlan
            dragTile.innerHTML = "";// en bricka blir tom efter man drar elementen ur brickan
        } else {
            return;
        }
        //Då alla nya brickor dragits till spelplanen, ska knappen för nya brickor aktiveras igen, så att man kan klicka fram fyra nya brickor.
        for (let i = 0; i < dragElems.length; i++) {
            if (dragElems[i].innerHTML != "") {
                newTilesBtn.disabled = true;
            } else {
                newTilesBtn.disabled = false;
            }
        }
        dropCount++;//räknare för antal droppar
        if (dropCount == 16) {
            newGameBtn.disabled = false;
            newTilesBtn.disabled = true;
        }
    }
}

/* ---------------------dragEnd------------------------------- */

//drag-and-drop avslutas
function dragEnd(e) {
    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].removeEventListener("dragover", dropZone);
        //dropZones[i].addEventListener("dragenter", handleDropZone);
        dropElems[i].removeEventListener("dragleave", dropZone);
        dropElems[i].removeEventListener("drop", dropZone);
    }

    msgElem.innerHTML = " Boxen dras inte längre ";
    //console.log(dragEnd);
}

/* ---------------------endGame------------------------------- */

//sluta spelet
function endGame() {
    // Aktivera/inaktivera knappar
    newGameBtn.disabled = false;
    newTilesBtn.disabled = true;
}//slut endGame