import * as THREE from "three";
import { CAM_NEAR, DEG } from "/config";
import { Bean } from "./Bean";
import { Light } from "./Light";
import { Sphere } from "./Sphere";

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

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);
  // fog = new THREE.Fog(0xf5d2c9, CAM_NEAR, CAM_NEAR + CAM_DELTA * 0.8)

  constructor() {
    super();

    this.objects = [
      new Light(),
      new Sphere(),
      ...BEANS.map(([d, z, i]) =>
        new Bean().translateOnAxis(
          new THREE.Vector3().setFromSphericalCoords(d, z, i),
          d
        )
      )
    ];

    this.objects.forEach((x) => this.add(x));
  }
}
