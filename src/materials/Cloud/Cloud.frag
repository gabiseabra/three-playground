uniform vec3 shadowColor;

varying float vOcclusion;

vec4 calcColor() {
  float d = 1. - vOcclusion;
  // float d = pow(vOcclusion, 2.);
  // float d = 1. - vOcclusion;
  // return vec4(gl_FragColor.rgb, 1. - d);
  return vec4(mix(gl_FragColor.rgb, shadowColor, d), 1.);
}