uniform float time;
uniform float uSpeed;
uniform float uSize;
uniform vec3 uColor;

varying vec3 vPos;


float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}

float when_le(float x, float y) {
  return 1.0 - when_gt(x, y);
}

// https://github.com/ayamflow/glsl-grid
float grid(vec3 pos, vec3 axis, float size) {
    float width = 1.0;
    float t = time * uSpeed;
    // Grid size
    vec3 tile = vec3(
      pos.x,
      pos.y + (t * 200.),
      pos.z
    ) / size;
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
