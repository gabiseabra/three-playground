uniform float displacement;
uniform float scale;

varying float vNoise;

#pragma glslify: snoise = require('glsl-noise/simplex/3d')
#pragma glslify: worley = require('glsl-worley/worley3D')

vec3 calcPosition() {
  vec3 worldPosition = (modelMatrix * vec4(position, 1.)).xyz;

  vec2 w = worley(worldPosition / scale, 1., false);
  float d =  1. - pow(w.x, 3.);

	vNoise = d * .5;
  return position + vNoise * displacement * normal;
}
