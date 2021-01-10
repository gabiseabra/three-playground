uniform float time;
uniform float speed;
uniform float gridSize;
uniform vec3 gridColor;

varying vec3 vPos;


float when_gt(float x, float y) { return max(sign(x - y), 0.0); }

float when_le(float x, float y) { return 1.0 - when_gt(x, y); }

// modified: https://github.com/ayamflow/glsl-grid
float grid(vec3 pos, vec3 axis, float size) {
  float width = 1.0;
  float t = time * speed;
  // Grid size
  vec3 tile = (pos + vec3(0., t * 200., 0.)) / size;
  // Grid centered gradient
  vec3 level = abs(fract(tile) - 0.5);
  // Derivative (crisp line)
  vec3 deri = fwidth(tile);
  vec3 grid3D = clamp((level - deri * (width - 1.0)) / deri, 0.0, 1.0);
  // Shorter syntax but pow(0.0) fails on some GPUs
  // float lines = float(length(axis) > 0.0) * pow(grid3D.x, axis.x) * pow(grid3D.y, axis.y) * pow(grid3D.z, axis.z);
  float lines = float(length(axis) > 0.0)
      * (when_gt(axis.x, 0.0) * grid3D.x + when_le(axis.x, 0.0))
      * (when_gt(axis.y, 0.0) * grid3D.y + when_le(axis.y, 0.0))
      * (when_gt(axis.z, 0.0) * grid3D.z + when_le(axis.z, 0.0));
  return 1.0 - lines;
}

float calcGrid() {
  return grid(vPos, vec3(1.0, 1.0, 0.0), gridSize);
}

bool clipCircle(vec2 uv) {
  return (length((uv - 0.5) * 2.) > 1.);
}
