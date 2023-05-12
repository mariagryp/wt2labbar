// Globala variabler
let inp1Elem, inp2Elem;//variables for input elements
let msgElem;//variable for message div-element 
let selFruitNr; // variable för frukter som valts i det första input-fältet som ska sedan visas i "valda frukter" sektionen


//   --------------------------------------------------
// Initiering av globala variabler och händelsehanterare
function init() {
    inp1Elem = document.getElementById("input1");//referens till input1
    inp2Elem = document.getElementById("input2");//referens till input2
    msgElem = document.getElementById("message");//referens till message-div (Felmeddelanden);
    document.getElementById("btn1").onclick = showFruit; // showFruit funktion anropas när man klickar på knappen "btn1";
    document.getElementById("btn2").onclick = addFruits; // funktion addFruits anropas då man klickar på knappen btn2

    selFruitNr = 0;//inga frukt är vald i första fältet från början
} // Slut init

window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//function showFruit läsar in indata och visar motsvarande bild på sidan
function showFruit() {
    let nr = getInput(inp1Elem, 5);//variable för läsa och spara indata konverterat in number
    if (nr == -1) return;// kontrol om nr är -1 (mindre än 0) så är det fel och funktionen avbryts med return


    document.getElementById("fruitImg").src = getUrl(nr);

    //numret på valda frukt sparas i den globala variablen selFruitNr så att denna frukt ska visas
    selFruitNr = nr;
}// Slut showFruit

//kontrollera input data - fellmeddelande visas om fel data inlöst
function getInput(elem, high) {
    msgElem.innerHTML = "";
    let nr = Number(elem.value);//input element, data som lösas in
    if (isNaN(nr)) {
        msgElem.innerHTML = "Du måste skriva ett tal med siffror";
        return -1;// returnerar -1 om det är ett fel annars returnerar avlästa numret med return nr;
    }
    //kontroll om tallet ligger utanför intervallet 1 och high (mindre än 1 eller större än high)
    if (nr < 1 || nr > high) {
        msgElem.innerHTML = "Du måste skriva ett tal mellan 1 och " + high;
        return -1;
    }
    //konvertara tallet till ett rätt, heltal format med hjälp av perseInt.
    nr = parseInt(nr);
    elem.value = nr;

    return nr;
}//slut getInput

//funktion som översätta bild nummer till en img-url
function getUrl(nr) {
    let url;//variable för url
    //kontrollera nr med switch-satsen och visa motsvarande img
    switch (nr) {
        case 1: url = "img/apple.png";
            break;
        case 2: url = "img/banana.png";
            break;
        case 3: url = "img/orange.png";
            break;
        case 4: url = "img/pear.png";
            break;
        case 5: url = "img/pineapple.png";
            break;
        default: url = "img/nofruit.png";
    }
    return url;
}//slut getUrl;

//funktion som lägga till frukter i en lista av valda frukter
function addFruits() {
    let amount = getInput(inp2Elem, 9);//variabel för resultat av data som läsas in i det andra textfältet
    let fruitUrl = getUrl(selFruitNr);//variabeln för resultat från selFruitNr url
    let imgList = "";

    if (amount == -1)
        return; //funktionen avbryts om amount (inlästa talet) är -1 (mindre än 0)

    // for-loop för att visa så många img-taggar som bestämms i det andra input fältet
    for (let i = 0; i < amount; i++) {
        imgList += "<img src='" + fruitUrl + "' alt='frukt'>";
    }
    document.getElementById("selectedFruits").innerHTML += imgList;
}//slut addFruits;

