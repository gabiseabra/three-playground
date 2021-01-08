import * as THREE from "three";
import { InnerGlow, OuterGlow } from "/objects/Glow";
import { animateObject3D } from '/lib/animateObject3D'

export class Sun extends THREE.Object3D {
  size = 1
  name = 'sun'
  speed = 0.005

  constructor({
    radius,
    color = 0xf79b5e,
    emissive,
    emissiveIntensity = .5,
    glowColor = 0xed4577
  }) {
    super();

    const lowPoly = new THREE.SphereGeometry(radius, 15, 15);
    const highPoly = new THREE.SphereGeometry(radius, 25, 25);

    lowPoly.computeFlatVertexNormals();

    const sphere = new THREE.Mesh(
      lowPoly,
      new THREE.MeshLambertMaterial({
        flatShading: true,
        color,
        emissive,
        emissiveIntensity
      })
    )
    this.add(sphere)

    const innerGlow = new InnerGlow(lowPoly, {color: glowColor})
    this.add(innerGlow)

    const outerGlow = new OuterGlow(highPoly, {color: glowColor})
    this.add(outerGlow)

    this.rotateX(0.15)

    animateObject3D(this, sphere)

    this.sphere = sphere
    this.innerGlow = innerGlow
    this.outerGlow = outerGlow
    this.glowColor = new THREE.Color(glowColor)
  }

  onBeforeRender() {
    this.rotateY(this.speed)
  }

  getGUI() {
    return [
      ['glowColor', {
        onChange: () => {
          this.innerGlow.material.uniforms.color.value.copy(
            this.glowColor
          )
          this.outerGlow.material.uniforms.color.value.copy(
            this.glowColor
          )
        }
      }],
      [null, { target: this.sphere.material }]
    ]
  }
}
