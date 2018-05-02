// http://www.messletters.com/en/big-text/ style "small" og "standard"
var acaas = [`
Stack-baserte programmeringsspraak + REST =  

     _       ____                   ____  
    / \\     / ___|   ____    ____  / ___| 
   / _ \\   | |      / _  |  / _  | \\___ \\ 
  / ___ \\  | |___  | (_| | | (_| |  ___) |
 /_/   \\_\\  \\____|  \\__,_|  \\__,_| |____/ 

  (Arbitrary Computation as a Service)


`,`
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
`,`
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
`,`
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

`,`
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
`,`

Et stack-basert programmeringsspraak  

  ____    _____    ____   _  __
 / ___|  |_   _|  / ___| | |/ /
 \\___ \\    | |   | |     | ' / 
  ___) |   | |   | |___  | . \\ 
 |____/    |_|    \\____| |_|\\_\\

 (Beware of the Turing tar-pit)


`,
    // Demo 1 - Hvoran funker stack-baserte spraak
    // Verdier paa stack 2 3, bare int32 er støttet
    // Matteoperasjoner +
    // Stack operasjoner . dup rot
    // Boolske verdier 0 og 1
    // Boolske operasjoner not =
    // Conditionals 0 ? 42 : 1337; 1 ? 42 : 1337;
    // Subrutiner # add-five 5 +
    // hprint`
`
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
`,`
# next-fib
	2dup +
!
`,`
# is-even
	dup 2 % 0 =
!

# next-is-zero
	dup 0 =
!
`,`
# fib-under-4m
	next-fib
	dup 4000000 > ?
		fib-under-4m
	: . ;
!
`,`
# sum-if-even
	swap is-even ?
		+
	: . ;
	swap next-is-zero ?
		.
    : swap sum-if-even ;
!
`,`
0 1 2 fib-under-4m sum-if-even !
`,`
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
`,`
names.Where(s => s.Length == 5)
     .OrderBy(s => s)
     .Select(s => s.ToUpper())
`,`
512 |> square |> toStr |> rev
`,`
ls | grep ".md" | rev
`,
`
    ___   _____    ___   _  __
   / __| |_   _|  / __| | |/ /
   \\__ \\   | |   | (__  | ' < 
   |___/   |_|    \\___| |_|\\_\\
                            
 ~~~~~~~~~~~~ Pluss ~~~~~~~~~~~~
     ___   ___   ___   _____ 
    | _ \\ | __| / __| |_   _|
    |   / | _|  \\__ \\   | |  
    |_|_\\ |___| |___/   |_|  


`,`
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
`,`
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
`,`
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
`,
    // Vis 1 1 + i rest-stck
    // Vis 1 1 + og define lol i hyperstck
`
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
`,
    // `<img style="height:15em;" src="images/power.gif">`,
`

 

  _   _                               (o)   ___ 
 | | | | __   __   ____     _ __     ____  |__ \\
 | |_| | \\ \\ / /  / _  |   | '_ \\   / _  |   / /
 |  _  |  \\ V /  | (_| |   | | | | | (_| |  |_| 
 |_| |_|   \\_/    \\__,_|   |_| |_|  \\__,_|  (_) 

         (Hva var poenget med dette)


`,`
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
`,`
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
`,`
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
`];