bool clipCircle(vec2 uv) {
  return (length((uv - 0.5) * 2.) > 1.);
}
