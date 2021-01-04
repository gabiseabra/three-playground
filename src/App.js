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
import { CAM_FOV, DEG } from "./config";

const mkComposer = ({ scene, camera, renderer }) => {
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType
  });

  const bokeh = new RealisticBokehEffect({
    blendFunction: BlendFunction.NORMAL,
    focus: Z0,
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
    new EffectPass(camera, bokeh),
    new HeatPass(camera)
  ])
    composer.addPass(pass);

  return composer;
};

export class App {
  composerScale = 1.5;
  currentSize = {};

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  get element() {
    return this.renderer.domElement;
  }

  constructor() {
    this.scene = new Scene();
    this.camera = new THREE.PerspectiveCamera(
      CAM_FOV,
      this.width / this.height,
      1,
      CAM_FAR * 2
    );
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false
    });
    this.controls = new OrbitControls(this.camera, this.element);
    this.composer = mkComposer(this);
    this.clock = new THREE.Clock(true);

    this.camera.position.z = Z0 + CAM_NEAR;
    // this.camera.position.y = -50
    // this.camera.rotateX(-5 * DEG)

    this.updateSize();
  }

  updateSize() {
    if (
      this.width === this.currentSize.width &&
      this.height === this.currentSize.height
    )
      return;
    const composerScale = 1.5;
    this.composer.setSize(
      this.width * composerScale,
      this.height * composerScale
    );
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.updateSize();
    this.composer.render(this.clock.getDelta());
    // this.renderer.render(this.scene, this.camera);
  }
}
