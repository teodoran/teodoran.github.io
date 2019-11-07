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

void main()
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`,`/*
What's a Fragmet Shader?
------------------------
* Part of the rendering pipeline responsible for calculating the color of individual pixels
* "A function returning a color for every pixel"

TODO: At some point introduce the thing we're writing shaders in.

*/

void main()
{
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
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

void main()
{
    float red = 0.8;
    float green = 0.4;
    float blue = 1.0;
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
`,`/*
Different colors for every pixel
--------------------------------
* Position of each pixel.
* Swizzling gl_FragCoord.xyxy is a vec4

*/

void main()
{
    vec4 pos = gl_FragCoord;

    float red = 0.8;
    float green = 0.4;
    float blue = 1.0;
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
`,`/*
Uniforms!
---------
* u_resolution

*/

uniform vec2 u_resolution;

void main()
{
    vec2 pos = gl_FragCoord.xy / 160.0;

    float red = pos.x;
    float green = pos.y;
    float blue = 1.0;
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
`,`/*
Sine and time I
---------------
* u_frame and cating with float().
* sin and cos.

*/

uniform int u_frame;
uniform vec2 u_resolution;

void main()
{
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    float red = pos.x;
    float green = pos.y;
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0);
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}

`,`/*
Making the pixels dance
-----------------------
* u_music and data from WebAudio.
* getByteFrequencyData

*/
uniform sampler2D u_music;
uniform int u_frame;
uniform vec2 u_resolution;

float music(vec2 position)
{
    return texture2D(u_music, position).w;
}

void main()
{
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    float red = pos.x * abs(sin(float(u_frame) / 60.0));
    float green = pos.y * abs(cos(float(u_frame) / 80.0));
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 30.0));
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
`,`/*
Check out
---------
* Slides: teodoran.github.io/mobile-era
* The Book of Shaders: thebookofshaders.com
* MDN WebGL tutorial: developer.mozilla.org/docs/Web/API/WebGL_API/Tutorial
* Shadertoy: shadertoy.com

*/

uniform sampler2D u_music;
uniform int u_frame;
uniform vec2 u_resolution;

float music(vec2 position)
{
    return texture2D(u_music, position).w;
}

void main()
{
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;

    float red = pos.x * abs(sin(float(u_frame) / 60.0)) * (1.0 / music(pos));
    float green = pos.y * abs(cos(float(u_frame) / 80.0)) * music(pos.yx);
    float blue = pow(pos.x, 2.0) + pow(pos.y, 2.0) * abs(sin(float(u_frame) / 120.0));
    float alpha = 1.0;
    gl_FragColor = vec4(red, green, blue, alpha);
}
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

// Shader borrowed from: https://www.shadertoy.com/view/wssXWl
uniform int u_frame;
uniform vec2 u_resolution;

#define iResolution u_resolution

float iTime()
{
    return float(u_frame) / 10.0;
}

vec2 sc,y,e=vec2(.000035,-.000035);float t,tt=0.,b,bb=0.,g1=0.,g2=0.;vec3 np,bp;
float bo(vec3 p,vec3 r){vec3 q=abs(p)-r;return max(max(q.x,q.y),q.z);}
float cy(vec3 p,float r){p.y=0.;return length(p)-r;}
float cz(vec3 p,float r){p.z=0.;return length(p)-r;}
mat2 r2(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));}
vec2 fb(vec3 p,vec3 m, float s)
{
  p.xz*=r2(s);
  p.xy*=r2(s+bb*1.4);
  vec2 h,t=vec2(bo(abs(p)-vec3(0,0,1),vec3(2.2,0.3,0.7)),m.x);
  t.x=min(0.6*cy(abs(abs(p)-vec3(0.5,0,0))-vec3(0.5,0,1),0.1),t.x);
  if(m.x<6.) g2+=0.1/(0.1+pow(abs(t.x),2.));
  h=vec2(bo(abs(p)-vec3(0,0,1),vec3(2.0,0.5,0.5)),m.y);
  t=(t.x<h.x)?t:h;
  h=vec2(bo(p,vec3(1.8,0.2,2.8)),m.z);
  t=(t.x<h.x)?t:h;
  t.x*=0.7;
  return t;
}
float noise(vec3 p){
  vec3 ip=floor(p),s=vec3(7,157,113);
  p-=ip; vec4 h=vec4(0,s.yz,s.y+s.z)+dot(ip,s);
  p=p*p*(3.-2.*p);
  h=mix(fract(sin(h)*43758.5),fract(sin(h+s.x)*43758.5),p.x);
  h.xy=mix(h.xz,h.yw,p.y);
  return mix(h.x,h.y,p.z);
}
vec2 mp( vec3 p )
{
  b=sin(p.z-tt*10.)*0.1;
  np=p;
  for(int i=0;i<5;i++){
    np=abs(np)-vec3(2.5,1.7,0);
    np.xy*=r2(cos(p.y*0.05)*0.5);
    np.xz*=r2(20.);
  }
  vec2 h,t=fb(np,vec3(5,3,6),b);
  bp=np;bp.yz*=r2(.785);bp=abs(bp*0.5)-vec3(3.2);
  np.xz*=r2(b);
  np.xy*=r2(b+bb*1.4);
  h=fb(bp,vec3(7,8,9),0.1);
  h.x*=2.0;
  t=(t.x<h.x)?t:h;
  h=vec2(cz(p,0.5-b),8);
  h.x=min(length(p)-6.+b,h.x);
  g1+=0.1/(0.1+pow(abs(h.x),2.));
  t=(t.x<h.x)?t:h;
  return t;
}
vec2 tr( vec3 ro, vec3 rd )
{
  vec2 h,t=vec2(0.1);
  for(int i=0;i<128;i++){
    h=mp(ro+rd*t.x);
    if(h.x<.0001||t.x>50.) break;
    t.x+=h.x;t.y=h.y;
  }
  if(t.x>50.) t.x=0.;
  return t;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = vec2(gl_FragCoord.x / iResolution.x, gl_FragCoord.y / iResolution.y);
    uv -= 0.5;
    uv /= vec2(iResolution.y / iResolution.x, 1);
    tt=mod(iTime(),100.);
  	bb=0.5+clamp(sin(tt),-0.5,0.5);
    vec3 ro=vec3(cos(tt*0.5)*15.,sin(tt*0.5)*15.,-20),
    cw=normalize(vec3(0)-ro),cu=normalize(cross(cw,vec3(0,1,0))),cv=normalize(cross(cu,cw)),
    rd=mat3(cu,cv,cw)*normalize(vec3(uv,.5)),
    co,fo,ld=normalize(vec3(0,0.5,-0.5));
    co=fo=vec3(.04)*(1.-(length(uv)-.2));
    sc=tr(ro,rd);t=sc.x;

    if(t>0.){

        vec3 po=ro+rd*t,no=normalize(e.xyy*mp(po+e.xyy).x+e.yyx*mp(po+e.yyx).x+e.yxy*mp(po+e.yxy).x+e.xxx*mp(po+e.xxx).x),

        al=vec3(1,0.05,0);
        float dif=max(0.,dot(no,ld)),
        aor=t/50.,ao=exp2(-2.*pow(max(0.,1.-mp(po+no*aor).x/aor),2.)),
        fr=pow(1.+dot(no,rd),4.),
        spo=exp(1.+3.*noise(np/vec3(.1,.2,.4)));

        if(sc.y<5.) al=vec3(0);
        if(sc.y>5.) al=vec3(1);
        if(sc.y>6.) {al=vec3(0.1,0.5,0.9);spo=exp(1.+3.*noise(bp/vec3(.1,.2,.4))); no*=(1.+.6*ceil(cos(bp*4.)));no=normalize(no);}
        if(sc.y>7.) {al=vec3(0);}
        if(sc.y>8.) {al=vec3(1);}

        vec3 sss=vec3(0.5)*smoothstep(0.,1.,mp(po+ld*0.4).x/0.4),
        sp=vec3(0.5)*pow(max(dot(reflect(-ld,no),-rd),0.),spo);
        co=mix(sp+al*(.8*ao+0.2)*(dif+sss),fo,fr);
        co=mix(co,fo,1.-exp(-.0001*t*t*t));
    }
    co+=g1*0.3;
  	co+=vec3(1,0.05,0)*g2*(0.004*bb);
    fragColor = vec4(pow(co,vec3(0.45)),1);
}

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`];