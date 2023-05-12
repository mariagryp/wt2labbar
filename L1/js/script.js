// Deklarera variablerna
var inp1Elem, inp2Elem;
var resElem;

//init funktion som sparar alla html referenserna i sig
function init() {
    inp1Elem = document.getElementById("input1");//refererar till html-input element 1(a)
    inp2Elem = document.getElementById("input2");//refererar till html-input element 2(b)
    resElem = document.getElementById("result");
    document.getElementById("runBtn").onclick = areaCalculations;//refererar till button html-element och tildelar click-funktion
}//slut init function
window.onload = init;//init function utförs då hela webbsidan laddas

//Function som läsar inputens värde och skrivar ut dessa på sidan
function areaCalculations() {
    //två variabler deklareras här då dem tillhör enbart denna function
    let length; // längd i meter
    let width; // bredd i meter
    let area; //yta i kvadratmeter

    length = Number(inp1Elem.value);
    width = Number(inp2Elem.value);
    area = length * width;

    resElem.innerHTML += "<p>Rektangelns area är " + area + " m<sup>2</sup></p>";

    //Area för en ellips
    area = 3.14 * length * width / 4;
    resElem.innerHTML += "<p>Ellipsens area är " + area + " m<sup>2</sup></p>";

    //Rektangelns längden ökas med 5
    area = (length + 5) * width;
    resElem.innerHTML += "<p>Då längden ökas med 5m blir rektangelns area " + area + " m<sup>2</sup></p>";


    //8. Egna tillägg

    //8a. Rektangelns längden ökas med 50% och bredden ökas med 3 meter
    area = (length + length * 0.5) * (width + 3);
    resElem.innerHTML += "<p>Då längden ökas med 50% och bredden ökas med 3 meter blir rektangelns area " + area + " m<sup>2</sup></p>";

    //8b. Beräkning av triangelns area
    area = (length * 3.28 * width * 3.28) / 2;
    resElem.innerHTML += "<p>Triangelns area blir " + area + " m<sup>2</sup></p>";

    //9a. Finn fem fel
    //9b. Finn fem fel
    //9c. Finn fem fel


}// slut på areaCalculations