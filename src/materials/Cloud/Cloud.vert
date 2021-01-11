uniform float displacement;
uniform float scale;
uniform float power;
uniform float center;
uniform vec3 up;

varying float vOcclusion;

#pragma glslify: snoise = require('glsl-noise/simplex/3d')
#pragma glslify: pnoise = require('glsl-noise/periodic/3d')
#pragma glslify: worley = require('glsl-worley/worley3D')

vec3 bubble(vec3 pos) {
  vec3 worldPosition = (modelMatrix * vec4(pos, 1.)).xyz;

  vec2 w = worley(worldPosition / scale, 1., false);
  float d =  1. - pow(w.x, 3.);

	vOcclusion *= d;

  return pos + pow(d, power) * displacement * normal;
}

vec3 distort(vec3 pos) {
  vec3 worldPosition = (modelMatrix * vec4(pos, 1.)).xyz;
  float n = 5.0 * snoise( worldPosition / (displacement * 2.) );
  float m = 1. - smoothstep(0., .5, abs(uv.y - center));
  float d = m * (displacement) + n * (displacement / 10.);
  return pos + d * normal;
}

vec3 calcPosition() {
  vOcclusion = 1.;
  return bubble(distort(position));
}
