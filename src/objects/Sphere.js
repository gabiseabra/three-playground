import * as THREE from "three";
import { setGradient } from "../config";
import { InnerGlow, OuterGlow } from "./Glow";
import { MATERIAL, Z0 } from "/config";

export class Sphere extends THREE.Object3D {
  size = 1;

  get radius() {
    return 10 * this.size;
  }

  constructor(material = MATERIAL) {
    super();

    const lowPoly = new THREE.SphereGeometry(this.radius, 15, 15);
    const highPoly = new THREE.SphereGeometry(this.radius, 25, 25);

    lowPoly.computeFlatVertexNormals();

    this.add(new THREE.Mesh(lowPoly, material));
    this.add(new InnerGlow(lowPoly, {
      color: new THREE.Color(0xed4577),
    }))
    this.add(new OuterGlow(highPoly, {
      color: new THREE.Color(0xed4577),
    }))
  }
}
