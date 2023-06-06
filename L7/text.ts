/* Normalt flöde i spelet
Följande punkter är obligatoriska för betyget G.

1. + Då man klickar på knappen för nytt spel, ska spelet initeras samt knappen för nytt spel inaktiveras och knappen för nya brickor aktiveras.
2. + Då man klickar på knappen för nya brickor, får man fyra nya brickor som väljs slumpmässigt bland brickorna 1-40. Samma nummer ska inte kunna väljas mer än en gång i en spelomgång. 
3. + De nya brickorna placeras i rutorna ovanför knappen. Klassen på dem ändras från empty till filled, så att de får en vit bakgrund. (Denna klass finns i CSS-koden.)

4. + Man kan sedan dra de nya brickorna till valfri tom ruta på spelplanen. Man drar en bricka i taget i valfri ordning.

5. + Man ska kunna släppa brickan över en tom plats i spelplanen. Medan man drar, ska den tomma plats man drar över markeras med en annan bakgrundsfärg.

-?????????------------------------------
6. Då alla nya brickor dragits till spelplanen, ska knappen för nya brickor aktiveras igen, så att man kan klicka fram fyra nya brickor.
--------------------------------

7.+ Både i spelplanen och i rutorna för de fyra brickor man fått slumpmässigt ska två olika klasser användas:
empty ska användas då rutan är tom.
filled ska användas då rutan innehåller en bricka, dvs då den innehåller ett nummer.

8. Då spelplanen är fylld ska alla rader och kolumner kontrolleras. Om det är en stigande serie, dvs numret i varje bricka är högre än numret i föregående bricka, ska det markeras med en grön bock till höger om raden eller under kolumnen. I annat fall ska det markeras med ett rött kryss.

9. Detta ska göras genom att lägga in klassen check eller cross i rutan till höger om raden eller under kolumnen. I CSS-koden finns det för dessa klasser kod, som då lägger in en bock eller ett kryss.

10. Antal korrekta serier (rader/kolumner) räknas och detta antal blir poäng, som skrivs ut under spelplanen.

11. Poängen för en spelomgång ska adderas till totalpoängen. 

12. En räknare för antal spel ska också räknas upp. Totalpoängen och räknaren ska visas i rutan i det övre högra hörnet.

13. Både totalpoäng och räknaren för antal spel ska sparas i en variabel i localStorage eller i en cookie. Båda värdena ska sparas i samma variabel eller cookie. Dessa läses in då man öppnar sidan, så att de poäng och antal spel som man haft tidigare finns kvar, då man kommer tillbaks till sidan. 

14. De ska då också skrivas ut på sidan.
Då vi testar allas program kommer vi få många cookies eller variabler i localStorage, visserligen i olika domäner, men det är ändå bra om vi enkelt kan se vad de hör till. Ta därför med ditt användarid (för studentkontot) i namnet på cookien eller namnet på variabeln i localStorage, t.ex. ab223xyUserInfo.

15.Då spelet är klart, ska knappen för nytt spel aktiveras igen, så att man kan spela en gång till. Då man sedan klickar på knappen för nytt spel, ska spelplanen återställas och meddelande från föregående spel tas bort. */
