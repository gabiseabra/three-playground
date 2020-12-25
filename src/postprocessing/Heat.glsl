#define HEAT_FREQUENCY 30.0
#define HEAT_AMPLITUDE 0.08
#define HEAT_SPEED 5.0
float easeInCubic(float x) {
  return x * x * x;
}
void mainImage(const in vec4 color, const in vec2 uv, out vec4 outputColor) {
  float y = easeInCubic(uv.y);
  vec2 vUv = uv;
  vUv.x += sin(y * HEAT_FREQUENCY + (time * HEAT_SPEED)) / (HEAT_FREQUENCY * (1.0 / HEAT_AMPLITUDE));
  outputColor = texture2D(inputBuffer, vUv);
}