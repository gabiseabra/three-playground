uniform float time;
uniform float speed;
uniform float displacement;
uniform float pathSize;
uniform float vertexStep;

varying vec3 vPos;

#pragma glslify: snoise = require('glsl-noise/simplex/3d')

float fz(vec2 uv) {
  float f = 5.;
  float t = time * (speed / f);
  float d = snoise(vec3(
    uv.x * f,
    (uv.y + t) * f,
    0.
  )) + 0.5;
  d *= displacement;
  d *= mix(0.05, 1., smoothstep(0., pathSize, abs(uv.x - 0.5)));

  return d;
}

vec3 calcPosition() {
  return vec3(position.xy, fz(uv));
}

vec3 calcNormal() {
  vec3 off = vec3(vertexStep, vertexStep, 0.0);
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
