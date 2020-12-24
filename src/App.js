import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { CAM_NEAR, CAM_FAR } from "@/config";
import { HeatEffect } from "@/postprocessing/HeatEffect";
import { Scene } from "@/objects/Scene";

const mkComposer = ({ scene, camera, renderer }) => {
  const composer = new EffectComposer(renderer);

  for (const pass of [
    new RenderPass(scene, camera),
    new EffectPass(camera, new HeatEffect())
  ])
    composer.addPass(pass);

  return composer;
};

export class App {
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
      45,
      this.width / this.height,
      1,
      CAM_FAR * 2
    );
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.element);
    this.composer = mkComposer(this);
    this.clock = new THREE.Clock(true);

    this.camera.position.z = CAM_NEAR;

    this.updateSize();
  }

  updateSize() {
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.composer.render(this.clock.getDelta());
    // this.renderer.render(this.scene, this.camera);
  }
}
