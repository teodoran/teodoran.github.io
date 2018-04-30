// http://www.messletters.com/en/big-text/ style "small" og "standard"
var flatmap = [
    `<pre style="color:yellow;">
TODO: Flatmap slides =  

     _       ____                   ____  
    / \\     / ___|   ____    ____  / ___| 
   / _ \\   | |      / _  |  / _  | \\___ \\ 
  / ___ \\  | |___  | (_| | | (_| |  ___) |
 /_/   \\_\\  \\____|  \\__,_|  \\__,_| |____/ 

  (Arbitrary Computation as a Service)


</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Hva kunne han ha snakket om?         |
|   ----------------------------         |
|                                        |
|   * Enteprise PowerShell scriptdeling  |
|   * Enteprise kunnskapsdeling          |
|     i stort prosjekt                   |
|                                        |
|  Klager rettes til programkomiteen :-) |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Hva skal han egentlig snakke om?     |
|   --------------------------------     |
|                                        |
|   * Litt om stack-baserte spraak       |
|   * Litt om STCK                       |
|   * STCK + REST? Hvorfor det?          |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
  ___   _                 _   
 / __| | |_   ____   __  | |__
 \\__ \\ |  _| / _  | / _| | / /
 |___/  \\__| \\__,_| \\__| |_\\_\\

 ~~~~~~~~~~~ Baserte ~~~~~~~~~~~
  ___                 (o)   _   
 / __|  _ __   _ _   ____  | |__
 \\__ \\ | '_ \\ | '_| / _  | | / /
 |___/ | .__/ |_|   \\__,_| |_\\_\\
       |_|                      

</pre>`,
    // `<img style="height:15em;" src="images/moore.jpg">`,
    // `<img style="height:15em;" src="images/setun.jpg">`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Stack-baserte programmeringsspraak   |
|   ---------------------------------    |
|                                        |
|   * Alt er postfiks                    |
|   * Ingen skikkelige variabler         |
|   * Hvordan funker det i praksis?      |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">

Et stack-basert programmeringsspraak  

  ____    _____    ____   _  __
 / ___|  |_   _|  / ___| | |/ /
 \\___ \\    | |   | |     | ' / 
  ___) |   | |   | |___  | . \\ 
 |____/    |_|    \\____| |_|\\_\\

 (Beware of the Turing tar-pit)


</pre>`,
    // Demo 1 - Hvoran funker stack-baserte spraak
    // Verdier paa stack 2 3, bare int32 er støttet
    // Matteoperasjoner +
    // Stack operasjoner . dup rot
    // Boolske verdier 0 og 1
    // Boolske operasjoner not =
    // Conditionals 0 ? 42 : 1337; 1 ? 42 : 1337;
    // Subrutiner # add-five 5 +
    // hprint
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Project Euler problem #2             |
|   ------------------------             |
|                                        |
|   * Summer alle Fibonacci-tall         |
|   * Under 4000000                      |
|                                        |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
# next-fib
	2dup +
!
</pre>`,
    `<pre style="color:yellow;">
# is-even
	dup 2 % 0 =
!

# next-is-zero
	dup 0 =
!
</pre>`,
    `<pre style="color:yellow;">
# fib-under-4m
	next-fib
	dup 4000000 > ?
		fib-under-4m
	: . ;
!
</pre>`,
    `<pre style="color:yellow;">
# sum-if-even
	swap is-even ?
		+
	: . ;
	swap next-is-zero ?
		.
    : swap sum-if-even ;
!
</pre>`,
    `<pre style="color:yellow;">
0 1 2 fib-under-4m sum-if-even !
</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Esoterisk, ja gjett om! men...       |
|   ------------------------------       |
|                                        |
|   * Lett aa embedde => Bra for DSL     |
|   * Ingen variabler => Ingen problemer |
|   * Begrensninger kan være en styrke!  |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
names.Where(s => s.Length == 5)
     .OrderBy(s => s)
     .Select(s => s.ToUpper())
</pre>`,
    `<pre style="color:yellow;">
512 |> square |> toStr |> rev
</pre>`,
    `<pre style="color:yellow;">
ls | grep ".md" | rev
</pre>`,

    `<pre style="color:yellow;">
    ___   _____    ___   _  __
   / __| |_   _|  / __| | |/ /
   \\__ \\   | |   | (__  | ' < 
   |___/   |_|    \\___| |_|\\_\\
                            
 ~~~~~~~~~~~~ Pluss ~~~~~~~~~~~~
     ___   ___   ___   _____ 
    | _ \\ | __| / __| |_   _|
    |   / | _|  \\__ \\   | |  
    |_|_\\ |___| |___/   |_|  


</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Hvor passer REST inn? #1             |
|   ------------------------             |
|                                        |
|   * GET /Person/3                      |
|   * DELETE /Sak/19                     |
|                                        |
|                                        |
|   (*host* JSON over *host* HTTP)       |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Hvor passer REST inn? #2             |
|   ------------------------             |
|                                        |
|   * Representational state transfer    |
|                      --------------    |
|                                        |
|   /Oppgave/1 -- Link1 --> /Trinn/1     |
|             \\- Link2 --> /Trinn/2     |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Hvor passer REST inn? #3             |
|   ------------------------             |
|                                        |
|  Tilstand og Operasjon = Ny Tilstand   |
|                                        |
|            [1; 1] og + = [2]           |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">rest-stck</pre>`,
    // Vis 1 1 + i rest-stck
    // Vis 1 1 + og define lol i hyperstck
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Esoterisk, ja gjett om! men...       |
|   ------------------------------       |
|                                        |
|   State transfer er:                   |
|   1) Utrolig uttrykksfullt             |
|   2) Veldig fleksibelt                 |
|   3) Noe noe tilstandsmaskin           |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    // `<img style="height:15em;" src="images/power.gif">`,
    `<pre style="color:yellow;">

 

  _   _                               (o)   ___ 
 | | | | __   __   ____     _ __     ____  |__ \\
 | |_| | \\ \\ / /  / _  |   | '_ \\   / _  |   / /
 |  _  |  \\ V /  | (_| |   | | | | | (_| |  |_| 
 |_| |_|   \\_/    \\__,_|   |_| |_|  \\__,_|  (_) 

         (Hva var poenget med dette)


</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   Begrensede spraak har fordeler       |
|   -----------------------------        |
|                                        |
|   * Færre ting som kan brukes feil     |
|   * Lett og embedde, DSL?              |
|                                        |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
+----------------------------------------+
|                                        |
|   REST kan være ekstremt fleksibelt    |
|   ---------------------------------    |
|                                        |
|   * Tilstandsmaskin                    |
|   * Vilkaarlig komputasjon             |
|                                        |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>`,
    `<pre style="color:yellow;">
         ____  ____  ____  ____ 
        ||t ||||a ||||k ||||k ||
        ||__||||__||||__||||__||
        |/__\\||/__\\||/__\\||/__\\|
            ____  ____  ____ 
           ||f ||||o ||||r ||
           ||__||||__||||__||
           |/__\\||/__\\||/__\\|
         ____  ____  ____  ____ 
        ||m ||||e ||||g ||||! ||
        ||__||||__||||__||||__||
        |/__\\||/__\\||/__\\||/__\\|
</pre>`];