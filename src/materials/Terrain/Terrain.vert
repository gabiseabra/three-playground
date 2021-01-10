uniform float time;
uniform float uSpeed;
uniform float uDisplacement;
uniform float uPathSize;
uniform float uStep;

#pragma glslify: snoise = require('glsl-noise/simplex/3d')

float fz(vec2 uv) {
  float f = 5.;
  float t = time * (uSpeed / f);
  float d = snoise(vec3(
    uv.x * f,
    (uv.y + t) * f,
    0.
  )) + 0.5;
  d *= uDisplacement;
  d *= mix(0.05, 1., smoothstep(0., uPathSize, abs(uv.x - 0.5)));

  return d;
}

vec3 calcPosition() {
  return vec3(position.xy, fz(uv));
}

vec3 calcNormal() {
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
