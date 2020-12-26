import * as THREE from "three";
import { MATERIAL, Z0 } from "/config";

export class Sphere extends THREE.Object3D {
  size = 1;

  get radius() {
    return 0.6 * this.size;
  }

  constructor(material = MATERIAL) {
    super();

    const geometry = new THREE.SphereGeometry(10, 15, 15);
    geometry.translate(0, 0, Z0);
    geometry.computeFlatVertexNormals();

    this.add(new THREE.Mesh(geometry, material));
  }
}
