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
  castShadow = true

  constructor(radius, distance, angle) {
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

    this.distance = distance
    this.angle = angle
  }

  get angle() {
    return Math.atan(-this.position.y / this.position.z)
  }

  set angle(a) {
    this.position.z = Math.cos(a) * this.distance
    this.position.y = Math.sin(a) * -this.distance
  }

  getGUI() {
    return [
      {prop: 'angle', min: 0, max: Math.PI, onChange: (_, {camera, scene}) => {
        camera.lookAt(this.position)
        //camera.updateProjectionMatrix()
      }}
    ]
  }
}
