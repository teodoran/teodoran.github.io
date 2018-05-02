// http://www.messletters.com/en/big-text/ style "small" og "standard"
var flatmap =
[`
   ___   ___   _    ___   ___   _    
  / __| | __| (_)  / __| | _ \\ | |   
 | (__  | _|  | | | (__  |  _/ | |__ 
  \\___| |___| |_|  \\___| |_|   |____|

           Church Encoding
                 in 
 Concatenative Programming Languages

`,`
Things to talk about
--------------------

* Concatenative programming
  - Concat, What?
  - STCK
* Let's encode!
  - Booleans
  - Numbers

`,`
 _ _  _  _ _ _|_ _  _  _ _|_.   _ 
(_(_)| |(_(_| | (/_| |(_| | |\\/(/_
                                  
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+
|p| |r| |o| |g| |r| |a| |m| |m| |i| |n| |g|
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+
| _  _  _     _  _  _ 
|(_|| |(_||_|(_|(_|(/_
        _|       _|   
                               What is it?

`,`
Syntax is based on composition
------------------------------

| Function exp | Concatenative exp |
|--------------|-------------------|
|     f(x)     |         f         |
|    f'(x, y)  |         f'        |
|   g(f(x))    |         f g       |

Table 1: Functions


| Function exp | Concatenative exp |
|--------------|-------------------|
|     f(3)     |       3 f         |
|    f'(3, 5)  |     5 3 f'        |
|   g(f(3))    |       3 f g       |

Table 2: Application and Concatenation

`,`
Evaluation is based on "simplification"
---------------------------------------

2 3 + 1 1 + *  =>  2 3 + 2 * // 1 1 + => 2
2 3 + 2 *      =>  5 2 *     // 2 3 + => 5
5 2 *          =>  10        // 5 2 * =>10
10

Done! no further simplification possible

(=> is read as simplifies to)

`,`
   ____    _____    ____   _  __
  / ___|  |_   _|  / ___| | |/ /
  \\___ \\    | |   | |     | ' / 
   ___) |   | |   | |___  | . \\ 
  |____/    |_|    \\____| |_|\\_\\

           A stack-based           
concatenative programming language

  (Beware of the Turing tar-pit!)

`,`
STCK is a stack-based language
------------------------------

* A stack keeps current execution state
* Simplification is eager
  - From left to right
* Quite strictly concatenative

`,`
The very basic operators
------------------------

* Symbols: a b c hello
* Reordering symbols: . swap dup rot

`,`
Quotations (aka Anonymous stacks)
---------------------------------

* Quotations: []
* Application: app
* Conditionals and Definitions

`,`
Doing stuff with Quotations
---------------------------

[a b c] |       =>  [b c] [a] // chop
[a b] [c d] ||  =>  [a b c d] // concat

`,`
 #####                                          
#     #  #    #  #    #  #####    ####   #    #
#        #    #  #    #  #    #  #    #  #    #
#        ######  #    #  #    #  #       ######
#        #    #  #    #  #####   #       #    #
#     #  #    #  #    #  #   #   #    #  #    #
 #####   #    #   ####   #    #   ####   #    #
                            _   _               
 ___   _ _    __   ___   __| | (_)  _ _    __ _ 
/ -_) | ' \\  / _| / _ \\ / _\` | | | | ' \\  / _\` |
\\___| |_||_| \\__| \\___/ \\__,_| |_| |_||_| \\__, |
                                           |___/ 
`,`
Church encoded booleans
-----------------------

    true(a, b) = a
    false(a, b) = b

`,`
Booleans in a concatenative language
------------------------------------

| Function exp | Concatenative exp |
|--------------|-------------------|
|  true(x, y)  |      true         |
| false(x, y)  |      false        |
|  true(a, b)  |  a b true app     |
| false(a, b)  |  a b false app    |

Making true:

    a b .       => a
    a b [.] app => a

Making false:

    a b swap .       => b
    a b [swap .] app => b

`,`
NOT is a useful boolean operator
--------------------------------

|   x   | x not |       false true x app       |
|-------|-------|------------------------------|
| true  | false | false true true app => false |
| false | true  | false true false app => true |

Making not:

    true false true rot => false true true
    false true true app => false

false true rot app can be factored into not:

    [false true rot app] not #

`,`
AND is also a useful boolean operator
-------------------------------------

|   x   |   y   |            y x x app           |
|-------|-------|--------------------------------|
| true  | false | false true true app   => false |
| false | true  | true false false app  => false |
| false | false | false false false app => false |
| true  | true  | true true true app    => true  |

Making and:

    x y swap  => y x
    y x dup   => y x x
    y x x app => y x x app

swap dup app can be factored into and:

    [swap dup app] and #

`,`
IF/ELSE decisions, decisions
----------------------------

if (true) { a } else { b }  =>  a
true [a] [b] ?              =>  a

Making if-else:

    true [a] [b] rot  =>  [a] [b] true
    [a] [b] true app  =>  [a]
    [a] app           =>  a

This gives us the following:

    true [a] [b] rot app app  =>  a

rot app app can be factored into ?

    [rot app app] ? #

`,`
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
 _  _                  _                     
| \\| |  _  _   _ __   | |__   ___   _ _   ___
| .\` | | || | | '  \\  | '_ \\ / -_) | '_| (_-<
|_|\\_|  \\_,_| |_|_|_| |_.__/ \\___| |_|   /__/
                                              
20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35
`,`
Church encoded numbers
----------------------

0(f(x), a) =     a
1(f(x), a) =   f(a)
2(f(x), a) = f(f(a))

`,`
How could we represent numbers in a concat-lang?
------------------------------------------------

| Function exp | result  | Concatenative exp | result |
|--------------|---------|-------------------|--------|
|  0(f(x), a)  |     a   |    a [f] 0 app    | a      |
|  1(f(x), a)  |   f(a)  |    a [f] 1 app    | a f    |
|  2(f(x), a)  | f(f(a)) |    a [f] 2 app    | a f f  |

A very naive solution:

    a [f] [.] app      =>  a        // 0
    a [f] [. f] app    =>  a f      // 1
    a [f] [. f f] app  =>  a f f    // 2

`,`
Trying to make 1 with pick
--------------------------

Making pick:

    a [f] [.] swap      =>  a [.] [f]
    a [.] [f] dup       =>  a [.] [f] [f]
    a [.] [f] [f] rot   =>  a [f] [.] [f]
    a [f] [.] [f] swap  =>  a [f] [f] [.]
    a [f] [f] [.] ||    =>  a [f] [f .]
    a [f] [f .] app     =>  a f
    
swap dup rot swap || can be factored into pick:

    [swap dup rot swap ||] pick #

Naive numbers with pick:

a [f] [.] app            =>  a        // 0
a [f] [.] pick app       =>  a f      // 1
a [f] [.] pick pick app  =>  a f f    // 2

`,`
Making numbers a single element on the stack
--------------------------------------------

    2 3 swap => 3 2

Option A:

    a [f] [[.] pick pick] app => ?

Option B:

    a [f] [[.] pick pick app] app => ?


Numbers as single elements:

    a [f] [[.] app] app            =>  a
    a [f] [[.] pick app] app       =>  a f
    a [f] [[.] pick pick app] app  =>  a f f

`,`
Finally! The successor function
-------------------------------

    [[[.] app]] 0 #
    [0 succ] 1 #
    [1 succ] 2 #

Making succ:

    [[.] app] |               =>  [app] [[.]]
    [app] [[.]] [pick] rot    =>  [[.]] [pick] [app]
    [[.]] [pick] [app] || ||  =>  [[.] pick app]

| [pick] rot || || can be factored into succ:

    [| [pick] rot || ||] succ #

Bonus?
`,`
             ____  ____  ____  ____  ____  ____ 
            ||T ||||h ||||a ||||n ||||k ||||s ||
            ||__||||__||||__||||__||||__||||__||
            |/__\\||/__\\||/__\\||/__\\||/__\\||/__\\|
                      ____  ____  ____ 
                     ||f ||||o ||||r ||
                     ||__||||__||||__||
                     |/__\\||/__\\||/__\\|
 ____  ____  ____  ____  ____  ____  ____  ____  ____  ____ 
||l ||||i ||||s ||||t ||||e ||||n ||||i ||||n ||||g ||||! ||
||__||||__||||__||||__||||__||||__||||__||||__||||__||||__||
|/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\|

                                       Thanks for listening!

`,`
 ____       __                                  __
/\\  _\`\\    /\\ \\                                /\\ \\
\\ \\ \\/\\_\\  \\ \\ \\___     __  __   _ __    ___   \\ \\ \\___
 \\ \\ \\/_/_  \\ \\  _ \`\\  /\\ \\/\\ \\ /\\\`'__\\ /'___\\  \\ \\  _ \`\\
  \\ \\ \\L\\ \\  \\ \\ \\ \\ \\ \\ \\ \\_\\ \\\\ \\ \\/ /\\ \\__/   \\ \\ \\ \\ \\
   \\ \\____/   \\ \\_\\ \\_\\ \\ \\____/ \\ \\_\\ \\ \\____\\   \\ \\_\\ \\_\\
    \\/___/     \\/_/\\/_/  \\/___/   \\/_/  \\/____/    \\/_/\\/_/

                                   __
                                  /\\ \\     __
   __     ___      ___     ___    \\_\\ \\   /\\_\\     ___       __
 /'__\`\\ /' _ \`\\   /'___\\  / __\`\\  /'_\` \\  \\/\\ \\  /' _ \`\\   /'_ \`\\
/\\  __/ /\\ \\/\\ \\ /\\ \\__/ /\\ \\L\\ \\/\\ \\L\\ \\  \\ \\ \\ /\\ \\/\\ \\ /\\ \\L\\ \\
\\ \\____\\\\ \\_\\ \\_\\\\ \\____\\\\ \\____/\\ \\___,_\\  \\ \\_\\\\ \\_\\ \\_\\\\ \\____ \\
 \\/____/ \\/_/\\/_/ \\/____/ \\/___/  \\/__,_ /   \\/_/ \\/_/\\/_/ \\/___L\\ \\
                                                             /\\____/
                                                             \\_/__/

`];