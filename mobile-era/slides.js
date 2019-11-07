// http://www.messletters.com/en/big-text/ style "small" og "standard"
var slides =
[`/*
The Quest for Good Graphics
---------------------------
* How did we end up with GPU's and stuff?
* Maybe say something about concurrency?
* Something about OpenGL and how we ended up with WebGL?
* (What version of OpenGL is supported by WebGL?)

*/
`,`/*
What's a Fragmet Shader?
------------------------
* Part of the rendering pipeline responsible for calculating the color of individual pixels
* "A function returning a color for every pixel"

TODO: At some point introduce the thing we're writing shaders in.

*/
`,`/*
A color for every pixel
-----------------------
* GLSL: OpenGL Shading Language
* Cannot print stuff other than the color to screen. "Visual debugging".
* Its a bit like C void main() {}
* gl_FragColor, thats the output. It's a vector with 4 values.
* Color-values go from 0-1.
* Types an so on. i.e. 1 is not ok but 1.0 is.
* Vectors, and basic vector manipulation:

*/

// vec4(1.0, 1.0, 1.0, 1.0) is same as vec4(1.0)

void main()
{
    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    // vec4(1.0 + 0.0, 0.0 + 0.0, 0.0 + 1.0, 1.0);
    gl_FragColor = red + blue;
}
`,`/*
Different colors for every pixel
--------------------------------
* gl_FragCoord is a vec2
* Position of each pixel.
* Swizzling gl_FragCoord.xyxy is a vec4

*/

void main()
{
    vec3 color = gl_FragCoord.xyx;
    vec3 smaller = vec3(0.006);
    gl_FragColor = vec4(smaller * color, 1.0);
}
`,`/*
Uniforms!
---------
* u_resolution

*/

void main()
{
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    float red = pos.x;
    float green = pos.y;
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0);
    gl_FragColor = vec4(red, green, blue, 1.0);
}
`,`/*
Sine and time
-------------
* u_frame and cating with float().
* sin and cos.

*/
`,`/*
Making the pixels dance
-------------
* u_music and data from WebAudio.

*/
`,`/*
8 TODO?

*/
`,`/*
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
*/

uniform int u_frame;
uniform vec2 u_resolution;
uniform sampler2D u_music;

float music(vec2 position)
{
    return texture2D(u_music, position).w;
}

void main()
{
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 pct = vec2(distance(st, vec2(0.5)));
    vec3 color = vec3(st.x, st.y, abs(sin(float(u_frame) / 60.0)));
    gl_FragColor = vec4(color, 2.0 * music(st));
}
`];