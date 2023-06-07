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
let markElems;//array med mark elelemnter
let dropCount = 0;// variabel för att kontollera antal släppta brickor
let gameCounter = 0;// variabel för spel räknare 
let msgTotalPoints;//variabel för total poäng meddelande
let countGamesMsg;//antal spel
let tempAllNrs;// temporary array of allNrs
let totalPoints = 0;// variabel för poäng
let allTotalPoints = 0;//variabel för alla totala poäng i spelet
let newTilesCount = 0;// räknare för antal nya brickor 


/* ---------------------init------------------------------- */

// Initiera globala variabler och händelsehanterare
function init() {
    newGameBtn = document.getElementById("newGameBtn");//start knappen
    newTilesBtn = document.getElementById("newTilesBtn");//new tiles knappen
    msgElem = document.getElementById("message");//meddelande till användaren
    countGamesMsg = document.getElementById("countGames");// referens till elelemnt antal spel
    dropElems = document.getElementById("board").getElementsByClassName("tile");//referens till drop zones brickorna
    dragElems = document.getElementById("newTiles").getElementsByClassName("tile");//referens till elementen för rutorna
    /* dragBox = document.getElementById("newTiles").getElementsByClassName("empty"); */
    msgTotalPoints = document.getElementById("totPoints");//referens till elemenet för total antal poäng
    markElems = document.getElementById("board").getElementsByClassName("mark");
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

    //anropar localStorage
    getLocalStorage();
}//slut init
window.addEventListener("load", init); //init aktiveras då sidan är inladdad

/* ---------------------newGame------------------------------- */
//initiera spelet  
function newGame() {
    msgElem.innerHTML = "";
    tempAllNrs = allNrs.slice();// kopia av array med all numbers
    dropCount = 0;
    totalPoints = 0;
    // Aktivera/inaktivera knappar
    newGameBtn.disabled = true;
    newTilesBtn.disabled = false;

    //ändrar style på dropElems vid spelets start
    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].innerHTML = "";
        dropElems[i].classList.remove("filled");
        dropElems[i].classList.add("empty");
    }

    //ta bort class check och cross från elementer för bock och kryss
    for (let i = 0; i < markElems.length; i++) {
        markElems[i].classList.remove("cross");
        markElems[i].classList.remove("check");
    }

}//slut newGame()

/* ---------------------newNumbers------------------------------- */

//toma brickor fylls med slumpade nummer
function newNumbers() {
    newTilesCount = 4;// 4 tiles 
    //slumpar 4 siffror bland tempAllNrs*/
    for (let i = 0; i < dragElems.length; i++) {
        let r = Math.floor(Math.random() * tempAllNrs.length);//
        let ix = tempAllNrs[r];//nytt nummer sparas i variabeln 
        tempAllNrs.splice(r, 1);//ta bort ett num som är redan vald
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
        //knappen för nya brickor avaktiveras
        newTilesCount--;
        if (newTilesCount == 0) {
            newTilesBtn.disabled = false;
        }
        //räknare för antal droppar
        dropCount++;
        if (dropCount == 16) {
            controlTilesSeries();
            countCheckMarks();
            endGame();
            setLocalStorage();
        }
    }
}
/* ---------------------controlTilesSeries------------------------------- */
function controlTilesSeries() {
    //referenser till raderna och kolumnerna
    let s1 = document.getElementsByClassName("s1");//raderna
    let s2 = document.getElementsByClassName("s2");//raderna
    let s3 = document.getElementsByClassName("s3");//raderna
    let s4 = document.getElementsByClassName("s4");//raderna
    let s5 = document.getElementsByClassName("s5");//kolumnerna
    let s6 = document.getElementsByClassName("s6");//kolumnerna
    let s7 = document.getElementsByClassName("s7");//kolumnerna
    let s8 = document.getElementsByClassName("s8");//kolumnerna

    //referenser till bock eller kryss elementer
    let s1mark = document.getElementById("s1mark");
    let s2mark = document.getElementById("s2mark");
    let s3mark = document.getElementById("s3mark");
    let s4mark = document.getElementById("s4mark");
    let s5mark = document.getElementById("s5mark");
    let s6mark = document.getElementById("s6mark");
    let s7mark = document.getElementById("s7mark");
    let s8mark = document.getElementById("s8mark");

    //anropar funktion för att kontroller serier 
    control(s1, s1mark);
    control(s2, s2mark);
    control(s3, s3mark);
    control(s4, s4mark);
    control(s5, s5mark);
    control(s6, s6mark);
    control(s7, s7mark);
    control(s8, s8mark);
}

// Går igenom varje serie och tilldelar klass beroende om serie är stigande eller ej
function control(serie, serieMark) {
    for (let i = 1; i < serie.length; i++) {
        if (parseFloat(serie[i].innerHTML) > parseFloat(serie[i - 1].innerHTML)
        ) {
            serieMark.classList.add("check");
        } else {
            serieMark.classList.add("cross");
            serieMark.classList.remove("check");
            return;
        }
    }
}
/* -------------------------countCheckMarks------------------------------- */
function countCheckMarks() {
    for (let i = 0; i < markElems.length; i++) {
        if (markElems[i].classList.contains("check")) {
            totalPoints++;
        }
    }
    msgElem.innerHTML = "Antalet rätta svar " + totalPoints;

    //räknar ihop totala poängar och skriver ut dessa
    allTotalPoints += totalPoints;
    msgTotalPoints.innerHTML = allTotalPoints;
}//countCheckMarks


/* ---------------------dragEnd------------------------------- */
//drag-and-drop avslutas
function dragEnd(e) {
    for (let i = 0; i < dropElems.length; i++) {
        dropElems[i].removeEventListener("dragover", dropZone);
        dropElems[i].removeEventListener("dragleave", dropZone);
        dropElems[i].removeEventListener("drop", dropZone);
    }
}//dragEnd

/* ---------------------localStorage------------------------------- */
//spara data i localStorage
function setLocalStorage() {
    let data = [gameCounter, allTotalPoints];//array med antal spel och total poäng
    localStorage.setItem('mg224dfUserInfo', JSON.stringify(data));//sparar array i localStorage

}//end setLocalStorage

//överför data från localStorage
function getLocalStorage() {
    let data = localStorage.getItem('mg224dfUserInfo');
    data = JSON.parse(data);

    //kontrollerar om data finns från localstorage.Om den 
    if (data != null) {
        gameCounter = Number(data[0]);//konvertera data into numbers
        allTotalPoints = Number(data[1]);//konvertera data into numbers
    }

    //skriver ut data 
    msgTotalPoints.innerHTML = allTotalPoints;
    countGamesMsg.innerHTML = gameCounter;
}//end getLocalStorage

/* ---------------------endGame------------------------------- */
//sluta spelet
function endGame() {
    // Aktivera/inaktivera knappar
    newGameBtn.disabled = false;
    newTilesBtn.disabled = true;

    gameCounter++;//räknare för antal spel
    countGamesMsg.innerHTML = gameCounter;
}//slut endGame