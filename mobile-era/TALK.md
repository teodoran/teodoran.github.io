Making the pixels dance
=======================
_Lightning: 15 min, Room: Lancing_

Abstract
--------
Playing around with shaders can be a creative and satisfying way to explore visual programming, and with WebGL being supported on most mobile and desktop browsers, it’s more accessible than ever. Still, writing shaders might seem intimidating at first glance. What is this strange GLSL-language, and why does all the examples resemble a badly formatted math paper?

Let’s take a quick dive into shader programming, and get familiar with the basics of fragment shaders, how to create more or less planned effects, and how to use audio to breath life into simple visualizations. Although shaders might take a lifetime to master, there’s plenty of room for casual exploration and happy accidents for those of us just starting out.

Links
-----
### Sounds:
* https://soundcloud.com/volcore/reminicent
* https://soundcloud.com/volcore/arp
* https://soundcloud.com/volcore/resumption
* https://soundcloud.com/volcore/prefix
* https://soundcloud.com/volcore/featherless
* https://soundcloud.com/volcore/formless

### Talk:
* https://teodoran.github.io/mobile-era/



The Quest for Good Graphics
---------------------------
* How did we end up with GPU's and stuff?
* Maybe say something about concurrency?
* Something about OpenGL and how we ended up with WebGL? (What version of OpenGL is supported by WebGL?)

What's a Fragmet Shader?
------------------------
* Part of the rendering pipeline responsible for calculating the color of individual pixels
* "A function returning a color for every pixel"

TODO: At some point introduce the thing we're writing shaders in.

A color for every pixel
-----------------------
* GLSL: OpenGL Shading Language
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

Uniforms!
---------
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

Sine and time
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
-------------
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