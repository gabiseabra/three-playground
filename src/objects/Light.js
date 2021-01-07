import * as THREE from "three";
import { WORLD_RADIUS } from '/config'

export class WorldLight extends THREE.Object3D {
  constructor(far = WORLD_RADIUS) {
    super()

    const hemisphere = new THREE.HemisphereLight(0xff9ed5, 0xe6179a, 1.25);
    this.add(hemisphere);

    const ambient = new THREE.AmbientLight(0xe6179a, 0.5);
    this.add(ambient);

    const directional = new THREE.DirectionalLight(0xff9ed5, 0.4);
    directional.position.set(0,1,0.25).normalize();
    this.add(directional);
    
    const point = new THREE.PointLight(0x50004, far * .75, far * 2, 10);
    point.position.set(0, far / 4, -far)
    this.add(point);
  }
}

export class CameraLight extends THREE.Object3D {
  constructor(far = WORLD_RADIUS) {
    super()

    const point = new THREE.PointLight(0x000040, far * .75, far * 2, 20);
    point.position.set(0, 0, 0)
    // this.add(point);
  }
}
