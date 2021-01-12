uniform float displacement;
uniform float scale;
uniform float power;
uniform float center;
uniform vec3 up;

varying float vOcclusion;

#pragma glslify: worley = require('glsl-worley/worley3D')

float bubble(vec3 pos) {
  vec2 w = worley(pos / scale, 1., false);
  float d =  1. - pow(w.x, 3.);
  d = pow(d, power) * displacement;
  return d;
}

vec3 calcPosition() {
  vec3 worldPosition = (modelMatrix * vec4(position, 1.)).xyz;

  float d = bubble(worldPosition);

  vOcclusion = d / displacement;

  return position + d * normal;
}
