#define NUM_OCTAVES 5

uniform float time;
uniform float uSpeed;
uniform float uDisplacement;
uniform float uPathSize;
uniform float uStep;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

float fz(vec2 uv) {
  float t = time * uSpeed;
  float d = fbm(vec3(
    uv.x * 10.,
    uv.y * 10. + t,
    0.
  )) * pow(uDisplacement, 2.);

  if (uPathSize > 0.) {
    d *= smoothstep(0., uPathSize, abs(uv.x - 0.5));
  }

  return d;
}

vec3 calcPosition(vec3 pos, vec2 uv) {
  vec3 transformed = pos;
  transformed.z = fz(uv);

  return transformed;
}

vec3 calcNormal(vec2 uv) {
  vec3 off = vec3(uStep, uStep, 0.0);
  float hL = fz(uv.xy - off.xz);
  float hR = fz(uv.xy + off.xz);
  float hD = fz(uv.xy - off.zy);
  float hU = fz(uv.xy + off.zy);

  // deduce terrain normal
  vec3 N = vec3(0.);
  N.x = hL - hR;
  N.y = hD - hU;
  N.z = 2.;
  N = normalize(N);

  return N;
}
