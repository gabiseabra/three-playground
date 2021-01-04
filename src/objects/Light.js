import * as THREE from "three";

export class Light extends THREE.Object3D {
  constructor() {
    super();

    const hemisphere = new THREE.HemisphereLight(0xff9ed5, 0xe6179a, 1.25);
    const directional = new THREE.DirectionalLight(0xff9ed5, 0.8);
    directional.position.set(0,1,0.25).normalize();
    const ambient = new THREE.AmbientLight(0xe6179a, 0.8);

    this.add(directional);
    this.add(hemisphere);
    this.add(ambient);
  }
}
