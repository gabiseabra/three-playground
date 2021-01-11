uniform vec3 shadowColor;

varying float vOcclusion;

vec4 calcColor() {
  float d = smoothstep(0.4, 1., 1. - vOcclusion) * .2;
  return vec4(mix(gl_FragColor.rgb, shadowColor, d), 1.);
}