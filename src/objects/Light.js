import * as THREE from "three";

export class Light extends THREE.Object3D {
  constructor() {
    super();

    const directional = new THREE.DirectionalLight(0xff9ed5, 0.6, 100);
    directional.position.set(1, 1, 0).normalize();
    const ambient = new THREE.AmbientLight(0xcaadde, 0.3);

    this.add(directional);
    this.add(ambient);
  }
}
