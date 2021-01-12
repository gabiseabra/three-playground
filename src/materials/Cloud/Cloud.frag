uniform vec3 shadowColor;

varying float vOcclusion;

vec4 calcColor() {
  float d = 1. - vOcclusion;
  return vec4(mix(gl_FragColor.rgb, shadowColor, d), 1.);
}
