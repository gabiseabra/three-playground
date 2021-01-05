import * as THREE from "three";
import { FogMaterial } from "/materials/Fog";

export class Sky extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereBufferGeometry(1, 25, 25);
    const material = new FogMaterial();
    material.side = THREE.BackSide;
    material.fog = false;
    material.depthWrite = false;
    super(geometry, material);
    this.scale.setScalar(1000);
  }
}
