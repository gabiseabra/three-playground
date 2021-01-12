import * as THREE from 'three'
import {
  EffectComposer,
  RenderPass
  // EffectPass,
  // BlendFunction,
  // RealisticBokehEffect
} from 'postprocessing'
import {HeatPass} from '/postprocessing/Heat'

export class Effects extends EffectComposer {
  dof = new THREE.Vector4(0.225, 1.0, 0.225, 2.0)

  constructor(scene, {camera, renderer, width, height}) {
    super(renderer, {
      frameBufferType: THREE.HalfFloatType
    })

    this.addPass(new RenderPass(scene, camera))

    /*
    const bokeh = new RealisticBokehEffect({
      blendFunction: BlendFunction.NORMAL,
      focus: 0.,
      luminanceGain: 0.0,
      bias: 10.0,
      fringe: 10.0,
      maxBlur: 10.0,
      rings: 3,
      samples: 6,
      manualDoF: true,
      // showFocus: true,
    });
    bokeh.uniforms.get("dof").value = this.dof
    this.addPass(new EffectPass(camera, bokeh))
    */

    this.addPass(new HeatPass(camera))

    this.setSize(width, height)
  }
}
