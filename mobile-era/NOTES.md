How to set up an audio loopback
-------------------------------
Fragmatic records audio from the computer audio input, so in order to drive the vizualisations from the audio playing on your computer,
you'll need to set up an audio loopback from your sound output to the input. This can be done in a number of different ways, depending on your OS.

### Ubuntu
* Install pavucontrol (PulseAudio Volume Control) using apt-get or the Ubuntu Software Center.

```shell
$> sudo apt-get install pavucontrol
```

* Open PulseAudio Volume Control. It should be in the applications menu under Sound and Video.

```shell
$> pavucontrol
```

* Open Sound Recorder and start recording. Playing any sound at this point would be helpful, as your level indicator should react once you have finished.

* Go to the "Recording" tab in the PulseAudio Volume Control window.
* Make sure that "Applications" is selected in the drop down menu on the "Recording" tab.
* Choose "Monitor of Internal Audio Analog Atereo" from the "Record Stream from" menu in the Sound Recorder entry of the application list.

Something from λ
----------------

- [Wierd science](https://youtu.be/gmMPvUwyMxA?t=689)
- [Very live shading](https://youtu.be/u517aj_JzVg?t=610)
- [Bonzomatic](https://github.com/Gargaj/Bonzomatic)
- [Book of shaders](https://thebookofshaders.com/11/)
- [Actors](https://github.com/heidisu/actor-invaders)
- [Hydra](https://github.com/ojack/hydra-synth)


Done: 13:30
Someone to take a picture?

Warning
-------
Flashing lights and Loud sound


The Quest for Good Graphics
---------------------------
* Since the beginning of computers humans have been obsessed with graphics
    - We've created pictures on oscilloscopes (uh·si·luh·skowpes)
    - Drawings on calculators
    - Messed around with sprites on Ataris
* But Good Graphics is hard work
    - When it comes to pixels, more is more
    - So we created dedicated hardware to satisfy the thirst of ever increasing resolution and graphic fidelity.
    - Aside: It's a bit funny to think that most devices, even smartphones, alost have a dedicated separate computer to handle the graphics.
* OpenGL (Open Graphics Library, 1992): Cross-platform application programming interface (API)
    - for rendering 2D and 3D vector graphics.
* WebGL (Web Graphics Library, 2011): Web specification based on OpenGL
    - Vladimir Vukićević @ Mozilla
    - Like the rest of the web: Available most places, like smartphones.


What's a Fragmet Shader?
------------------------
* A lot of stuff goes into creating good graphics.
    - Usually you'll work with a rendering pipeline consisting of several things
    - Maybe something works with 3D geometry?
    - A vertex shader that works with that geometry?
    - But today we'll talk about fragment shaders, og pixel shaders.
*  Fragment shaders responsible for calculating the color of individual pixels
    - "A function returning a color for every pixel on the screen"
    - Parallel, so you cannot know the color of other pixels.

f(x, y, secret_sauce) => color(r, g, b, α)

TODO: At some point introduce the thing we're writing shaders in.

A color for every pixel
-----------------------
* GLSL: OpenGL Shading Language
* We're currently in a shader. When
* Cannot print stuff other than the color to screen. "Visual debugging".
* Its a bit like C `void main() {}`
* `gl_FragColor`, thats the output. It's a vector with 4 values.
* Color-values go from 0-1.
* Types an so on. i.e. `1` is not ok but `1.0` is.
* Vectors, and basic vector manipulation:

```
vec4(1.0, 1.0, 1.0, 1.0) is same as vec4(1.0)
```

```
void main()
{
    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
    // vec4(1.0 + 0.0, 0.0 + 0.0, 0.0 + 1.0, 1.0);
    gl_FragColor = red + blue;
}
```

Different colors for every pixel
--------------------------------
* `gl_FragCoord` is a `vec2`
* Position of each pixel.
* Swizzling `gl_FragCoord.xyxy` is a `vec4`

```
void main()
{
    vec3 color = gl_FragCoord.xyx;
    vec3 smaller = vec3(0.006);
    gl_FragColor = vec4(smaller * color, 1.0);
}
```

Uniforms: The secret sauce
--------------------------
* `u_resolution`

```
void main()
{
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    float red = pos.x;
    float green = pos.y;
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0);
    gl_FragColor = vec4(red, green, blue, 1.0);
}
```

Sine and Time
-------------
* `u_frame` and cating with `float()`.
* `sin` and `cos`.

Want to get by:
```
float red = float(u_frame) / 60.0;
```

Want to end up:
```
vec2 pos = gl_FragCoord.xy / u_resolution.xy;

float red = pos.x * abs(sin(float(u_frame) / 60.0));
float green = pos.y * abs(cos(float(u_frame) / 80.0));
float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 30.0));
float alpha = 1.0;
gl_FragColor = vec4(red, green, blue, alpha);
```

Making the pixels dance
-----------------------
* `u_music` and data from WebAudio.

Go by:
```
vec2 pos = gl_FragCoord.xy / u_resolution.xy;

float red = pos.x * abs(sin(float(u_frame) / 60.0));
float green = pos.y * abs(cos(float(u_frame) / 80.0));
float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 30.0));
float alpha = 3.0 * music(pos);
gl_FragColor = vec4(red, green, blue, alpha);
```
Then BOSS!

End up here?
```
vec2 pos = gl_FragCoord.xy / u_resolution.xy;

float red = pos.x * abs(sin(float(u_frame) / 60.0)) * music(pos);
float green = pos.y * abs(cos(float(u_frame) / 80.0)) * music(pos.yx);
float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 120.0));
float alpha = 1.0;
gl_FragColor = vec4(red, green, blue, alpha);
```

Also a good option!
```
float red = pos.x * abs(sin(float(u_frame) / 60.0)) * (1.0 / music(pos));
```

Some other stuff:
```
uniform vec2 u_resolution;
uniform int u_frame;
uniform sampler2D u_music;

float music(vec2 position)
{
    return texture2D(u_music, position).w;
}

vec2 split(vec2 pos, float n)
{
    return mod(pos * n, 1.0);
}

vec2 invert(vec2 pos)
{
	return abs(pos - 1.0);
}

vec2 mirror(vec2 pos)
{
	return abs(mod((2.0 * pos) - 1.0, 2.0) - 1.0);
}

void main()
{
    vec2 pos = mirror(gl_FragCoord.xy / u_resolution.xy);

    float red = pos.x * abs(sin(float(u_frame) / 60.0)) * music(pos);
    float green = pos.y * abs(cos(float(u_frame) / 80.0)) * music(pos.yx);
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 120.0));
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
```

More wierdness:
(Justice Genesis / Logistics 2999)
```
uniform vec2 u_resolution;
uniform int u_frame;
uniform sampler2D u_music;

float music(vec2 position)
{
    return texture2D(u_music, position).w;
}

vec2 split(vec2 pos, float n)
{
    return mod(pos * n, 1.0);
}

vec2 invert(vec2 pos)
{
	return abs(pos - 1.0);
}

vec2 mirror(vec2 pos, float n)
{
	return abs(mod((n * pos) - (n / 2.0), n) - (n / 2.0));
}

void main()
{
    vec2 st = mirror(gl_FragCoord.xy / u_resolution.xy, 2.0);
    vec2 pos = mirror(gl_FragCoord.xy / u_resolution.xy, st.x * 6.0);

    float red = pos.x * abs(sin(float(u_frame) / 60.0)) * music(pos);
    float green = pos.y * abs(cos(float(u_frame) / 80.0)) * music(pos.yx);
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 120.0));
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
```