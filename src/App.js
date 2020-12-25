import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  DepthOfFieldEffect,
  BlendFunction
} from "postprocessing";
import { CAM_NEAR, CAM_FAR, Z0 } from "@/config";
import { HeatPass } from "@/postprocessing/Heat";
import { Scene } from "@/objects/Scene";
import { CAM_FOV } from "./config";

const mkComposer = ({ scene, camera, renderer }) => {
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType
  });

  const dof = new DepthOfFieldEffect(camera, {
    focusDistance: 0.1,
    focalLength: 0.1,
    bokehScale: 5.0,
    blendFunction: BlendFunction.NORMAL
  });
  dof.target = new THREE.Vector3(0, 0, Z0);

  for (const pass of [
    new RenderPass(scene, camera),
    new EffectPass(camera, dof),
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

    this.camera.position.z = CAM_NEAR;

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
