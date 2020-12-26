import * as THREE from "three";
import { DEG, MATERIAL } from "/config";

export class Bean extends THREE.Object3D {
  size = 1;

  get radius() {
    return 0.6 * this.size;
  }

  constructor(material = MATERIAL) {
    super();
    // geometry components
    const body = new THREE.TorusGeometry(
      this.size,
      this.radius,
      10,
      10,
      Math.PI / 2
    );
    const ltip = new THREE.SphereGeometry(
      this.radius,
      10,
      3,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const rtip = ltip.clone();
    ltip.rotateZ(90 * DEG);
    ltip.translate(0, this.size, 0);
    rtip.rotateZ(180 * DEG);
    rtip.translate(this.size, 0, 0);
    // merged geometry
    const geometry = new THREE.Geometry();
    geometry.mergeMesh(new THREE.Mesh(body));
    geometry.mergeMesh(new THREE.Mesh(ltip));
    geometry.mergeMesh(new THREE.Mesh(rtip));
    geometry.mergeVertices();
    geometry.computeFlatVertexNormals();
    geometry.lookAt(
      new THREE.Vector3(
        THREE.MathUtils.randFloat(-1, 1),
        THREE.MathUtils.randFloat(-1, 1),
        THREE.MathUtils.randFloat(-1, 1)
      )
    );

    this.add(new THREE.Mesh(geometry, material));
  }
}
