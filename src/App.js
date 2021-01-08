import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BlendFunction,
  RealisticBokehEffect,
  SelectiveBloomEffect
} from "postprocessing";
import { CAM_NEAR, CAM_FAR, Z0, Z1 } from "/config";
import { HeatPass } from "/postprocessing/Heat";
import { Scene } from "./Scene";
import { CAM_FOV } from "./config";
import { GUI } from '/lib/GUI'

const mkComposer = ({ scene, camera, renderer }) => {
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType
  });

  const bokeh = new RealisticBokehEffect({
    blendFunction: BlendFunction.NORMAL,
    focus: 0.,
    luminanceGain: 0.0,
    bias: 10.0,
    fringe: 10.0,
    maxBlur: 10.0,
    rings: 3,
    samples: 6,
    manualDoF: true
    // showFocus: true,
  });
  bokeh.uniforms.get("dof").value = new THREE.Vector4(
    0.225,
    1.0,
    0.225,
    2.0
  )

  for (const pass of [
    new RenderPass(scene, camera),
    // new EffectPass(camera, bokeh),
    new HeatPass(camera)
  ])
    composer.addPass(pass);

  return composer;
};

export class App {
  get element() {
    return this.renderer.domElement;
  }

  constructor(width, height) {
    this.camera = new THREE.PerspectiveCamera(CAM_FOV, width / height, 1, CAM_FAR);
    this.camera.position.y = 50

    this.scene = new Scene(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true
    })

    // this.controls = new OrbitControls(this.camera, this.element)
    this.composer = mkComposer(this)
    this.clock = new THREE.Clock(true)
    this.gui = new GUI(this)

    this.setSize(width, height);
  }

  setSize(width, height) {
    if (this.width === width && this.height === height) return

    this.width = width
    this.height = height

    this.composer.setSize(this.width, this.height);
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    const t = this.clock.getDelta()
    this.composer.render(t);
  }
}
