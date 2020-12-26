import { Effect, EffectPass, BlendFunction } from "postprocessing";
import FRAGMENT from "./Heat.glsl";

export class HeatEffect extends Effect {
  constructor() {
    super("HeatEffect", FRAGMENT, {
      blendFunction: BlendFunction.AVERAGE
    });
  }
}

export class HeatPass extends EffectPass {
  constructor(camera) {
    super(camera, new HeatEffect());
  }
}
