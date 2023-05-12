// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt

let selectedWord;//Det ord som valts slumpmässigt och som användaren ska gissa på.
let letterBoxes;//Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet.
let hangmanImg;//Referens till img-elementet med bilden för galgen och gubben.
let hangmanNr;//Nummer för aktuell bild (0-6), för den bildfil som visas (så man sedan kan veta vilket som blir nästa bild).
let msgElem;//Referens till div-elementet för meddelanden.
let startGameBtn;
let letterButtons;
let startTime;

// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    //Startknappen
    startGameBtn = document.getElementById("startGameBtn");//variabeln för startkanppen "Starta spelet";

    //Bokstavsknapparna
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");//en array med referenser till alla knappar i div-elementet "letterButtons".
    //letterButtons loopar och funktionen quesssLetter anropas när man klickar på bokstavsknappar
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].onclick = guessLetter;

    //Elementen för bild och meddelanden:
    msgElem = document.getElementById("message");//Referens till div-elementet för meddelanden.
    hangmanImg = document.getElementById("hangman");//Referens till img-elementet med bilden för galgen och gubben.


    //Startknappen anropas
    document.getElementById("startGameBtn").onclick = startGame;//funktionen startGameanropas, då man klickar på startknappen.

    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;

} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Function för initiering av ett nytt spel. Välja ord, visa bokstavsrutor,
//visa första bilden (tom bild)
function startGame() {
    let now = new Date();
    startTime = now.getTime();
    randomWord();
    showLetterBoxes();
    hangmanNr = 0;
    hangmanImg.src = "img/h0.png";

    startGameBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = false;

    msgElem.innerHTML = "";
}// slut startGame

//Function randomWord
/* Funktionen randomWord •Ta fram ett slumptal som ska användas som ett index till en lista av ord. Det ska alltså vara ett tal mellan 0 och antal ord i en listan. •Indexera listan med slumptalet och spara valt ord i en global variabel. (Ordet behövs sedan i de andra funktionerna.) */
function randomWord() {
    let oldWord = selectedWord;
    while (oldWord == selectedWord) {
        let ix = Math.floor(wordList.length * Math.random());//Generera ett slumptal mellan 0 och antal ord i wordList. Spara slumptalet i en lokal variabel kallad ix.
        selectedWord = wordList[ix];//sparar det slumptalet i selectedWord med index ix
    }
}// slut randomWord

//Function showLetterBoxes
function showLetterBoxes() {
    let newCode = "";//
    //for-loop för att gå igenom alla tecken i selectedWord
    for (i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp;</span>";
    }
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");

}// slut showLetterBoxes

//Function guessLetter
function guessLetter() {
    let letter = this.value;
    this.disabled = true;
    let letterFound = false;//variabeln för 
    let correctLettersCount = 0;
    console.log(letter);
    for (i = 0; i < selectedWord.length; i++) {
        if (letter == selectedWord.charAt(i)) {
            letterBoxes[i].innerHTML = letter;
            letterFound = true;
        }
        if (letterBoxes[i].innerHTML !== "&nbsp;") {
            correctLettersCount++;
        }
    }
    if (letterFound == false) {
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        if (hangmanNr == 6) {
            endGame(true);
        }
    }
    if (correctLettersCount == selectedWord.length) {
        endGame(false);
    }
}// slut guessLetter

//Function endGame
function endGame(manHanged) {
    let runTime = (new Date().getTime() - startTime) / 1000;
    if (manHanged == true) {
        msgElem.innerHTML = "Du lyckades inte att rädda gubben. Gubben hängdes! Rätt svar är " + selectedWord;
    } else {
        msgElem.innerHTML = "Gratuerar! Du lyckades att rädda gubben!";
    }
    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++)
        letterButtons[i].disabled = true;

    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";
}// slut endGame




