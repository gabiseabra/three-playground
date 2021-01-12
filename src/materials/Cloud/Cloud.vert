uniform float displacement;
uniform float scale;
uniform float power;
uniform float center;
uniform vec3 up;

varying float vOcclusion;

#pragma glslify: snoise = require('glsl-noise/simplex/3D')
#pragma glslify: worley = require('glsl-worley/worley3D')

vec3 orthogonal(vec3 v) {
  if (abs(v.x) > abs(v.z))
    return normalize(vec3(-v.y, v.x, 0.0));
  else
    return normalize(vec3(0.0, -v.z, v.y));
}

float bubble(vec3 P) {
  vec3 worldPosition = (modelMatrix * vec4(P, 1.)).xyz;
  vec2 w = worley(worldPosition / scale, 1., false);
  float d =  1. - pow(w.x, 3.);
  d = pow(d, power) * displacement;
  return d;
}

vec3 distort(vec3 P) {
  P.y += displacement * snoise(P / (displacement * 3.));
  P.z -= displacement * snoise(P / (displacement * 3.));

  return P;
}

void calcPosition(
  out vec3 P,
  out vec3 N
) {

  P = position;
  N = normal;
  vec3 T = orthogonal(N);
  vec3 B = normalize(cross(N, T));

  float off = .01;
  vec3 tn = distort(P + T * off);
  vec3 bn = distort(P + B * off);
  P = distort(P);
  N = normalize(cross(tn - P, bn - P));

  float d = bubble(P);

  P += d * N;

  vOcclusion = d / displacement;
}
