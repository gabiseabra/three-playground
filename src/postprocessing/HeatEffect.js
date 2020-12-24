import { Effect, BlendFunction } from "postprocessing";

export class HeatEffect extends Effect {
  constructor() {
    super("HeatEffect", FRAGMENT, {
      // blendFunction: BlendFunction.SKIP
    });
  }
}

const FRAGMENT = `
#define HEAT_FREQUENCY 50.0
#define HEAT_SPEED 1.0

float easeInCubic(float x) {
  return x * x * x;
}

void mainUv(inout vec2 uv) {
  float y = easeInCubic(uv.y);
  uv.x += sin(y * HEAT_FREQUENCY + (1.0 - y) * time * HEAT_SPEED) / HEAT_FREQUENCY;
}
`;
