// http://www.messletters.com/en/big-text/ style "small" og "standard"
var flatmap = [
`<pre style="color:yellow;">



            Church Encoding
                  in 
    Concatenative Programming Languages





</pre>`,
`<pre style="color:yellow;">
Agenda
------

* Concatenative programming
  - Concat, What?
  - STCK
* Let's encode!
  - Booleans
  - Numbers

</pre>`,
`<pre style="color:yellow;">



What is a concatenative programming language?



</pre>`,
`<pre style="color:yellow;">
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
</pre>`,
`<pre style="color:yellow;">
Evaluation is based on "simplification"
---------------------------------------

2 3 + 1 1 + *  =>  2 3 + 2 * // 1 1 + => 2
2 3 + 2 *      =>  5 2 *     // 2 3 + => 5
5 2 *          =>  10        // 5 2 * => 10
10

Done! no further simplification possible

(=> is read as simplifies to)

</pre>`,
`<pre style="color:yellow;">
  A stack-based concatenative
      programming language

  ____    _____    ____   _  __
 / ___|  |_   _|  / ___| | |/ /
 \\___ \\    | |   | |     | ' / 
  ___) |   | |   | |___  | . \\ 
 |____/    |_|    \\____| |_|\\_\\

 (Beware of the Turing tar-pit)


</pre>`,
`<pre style="color:yellow;">
STCK is stack-based
-------------------

* A stack keeps current execution state
* Simplification is eager from left to right
* Quite strictly concatenative

</pre>`,
`<pre style="color:yellow;">
Basic operators
---------------

* Symbols: a b c hello
* Reordering symbols: . swap dup rot

</pre>`,
`<pre style="color:yellow;">
Elstad's conjecture
-------------------

> Any stack-based concatenative programming language
  need to access at most the topmost three elements
  of the stack to be Turing complete.

</pre>`,
`<pre style="color:yellow;">
Quotations
----------

* Quotations: []
* Application: app
* Conditionals and Definitions

</pre>`,
`<pre style="color:yellow;">
Quotation operations
--------------------

[a b c] |       =>  [b c] [a]    // chop
[a b] [c d] ||  =>  [a b c d]    // concat

</pre>`,
`<pre style="color:yellow;">



Church encoding booleans



</pre>`,
`<pre style="color:yellow;">
Church encoded booleans
-----------------------

    true(a, b) = a
    false(a, b) = b

</pre>`,
`<pre style="color:yellow;">
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

</pre>`,
`<pre style="color:yellow;">
Not
---

|   x   | x not |       false true x app       |
|-------|-------|------------------------------|
| true  | false | false true true app => false |
| false | true  | false true false app => true |

Making not:

    true false true rot => false true true
    false true true app => false

false true rot app can be factored into not:

    [false true rot app] not #

</pre>`,
`<pre style="color:yellow;">
And
---

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

</pre>`,
`<pre style="color:yellow;">
Conditional statements
----------------------

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

</pre>`,
`<pre style="color:yellow;">



Church encoding numbers



</pre>`,
`<pre style="color:yellow;">
Church encoded numbers
----------------------

0(f(x), a) =     a
1(f(x), a) =   f(a)
2(f(x), a) = f(f(a))

</pre>`,
`<pre style="color:yellow;">
How to represent numbers in a concatenative language?
-----------------------------------------------------

| Function exp | result  | Concatenative exp | result |
|--------------|---------|-------------------|--------|
|  0(f(x), a)  |     a   |    a [f] 0 app    | a      |
|  1(f(x), a)  |   f(a)  |    a [f] 1 app    | a f    |
|  2(f(x), a)  | f(f(a)) |    a [f] 2 app    | a f f  |

A naive solution:

    a [f] [.] app      =>  a        // 0
    a [f] [. f] app    =>  a f      // 1
    a [f] [. f f] app  =>  a f f    // 2

</pre>`,
`<pre style="color:yellow;">
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

</pre>`,
`<pre style="color:yellow;">
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

</pre>`,
`<pre style="color:yellow;">
The successor function
----------------------

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
</pre>`,
`<pre style="color:yellow;">
         ____  ____  ____  ____ 
      s ||t ||||a ||||k ||||k ||
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