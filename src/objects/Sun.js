import * as THREE from "three";
import { InnerGlow, OuterGlow } from "./Glow";

export const MATERIAL = new THREE.MeshLambertMaterial({
  vertexColors: THREE.VertexColors,
  flatShading: true,
  dithering: true,
  color: 0xf79b5e,
  emissiveIntensity: .5,
})

export class Sun extends THREE.Object3D {
  size = 1;
  name = 'sun'

  constructor(radius) {
    super();

    const lowPoly = new THREE.SphereGeometry(radius, 15, 15);
    const highPoly = new THREE.SphereGeometry(radius, 25, 25);

    lowPoly.computeFlatVertexNormals();

    this.add(new THREE.Mesh(lowPoly, MATERIAL));
    this.add(new InnerGlow(lowPoly, {
      color: new THREE.Color(0xed4577),
    }))
    this.add(new OuterGlow(highPoly, {
      color: new THREE.Color(0xed4577),
    }))
  }
}
