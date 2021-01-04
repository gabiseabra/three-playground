import * as THREE from "three";
import { DEG } from "/config";
import { Bean } from "./Bean";
import { Sphere } from "./Sphere";
import { RetroText } from "./RetroText";

// Hand picked spherical coordinates of some beans
const BEANS = [
  [5.5, 90 * DEG, 90 * DEG],
  [5, 55 * DEG, 60 * DEG],
  [4.8, 125 * DEG, 80 * DEG],
  [5, 80 * DEG, 35 * DEG],
  [4.6, 240 * DEG, 90 * DEG],
  [5, 300 * DEG, 120 * DEG],
  [4.5, 215 * DEG, 120 * DEG],
  [5.5, 275 * DEG, 130 * DEG],
  [5.2, 315 * DEG, 40 * DEG]
];

export class Horizon extends THREE.Object3D {
  constructor() {
    super();

    const title = new RetroText('GABI SEABRA', {
      height: 1
    })
    title.position.set(-6.5, -1, 17)
    const objects = [
      new Sphere(),
      title,
      // lmao
      // ...BEANS.map(([d, z, i]) =>
      //   new Bean().translateOnAxis(
      //     new THREE.Vector3().setFromSphericalCoords(d, z, i),
      //     d
      //   )
      // )
    ];

    objects.forEach((x) => this.add(x));
  }
}
