import * as THREE from 'three'
import {CloudMaterial} from '/materials/Cloud'
import {CapsuleBufferGeometry} from './CapsuleBufferGeometry'

export class Cloud extends THREE.Mesh {
  constructor({radius = 50, height = 200, detail = 16, ...opts} = {}) {
    const geometry = new CapsuleBufferGeometry(
      radius,
      radius,
      height,
      detail * Math.PI,
      (detail / 4) * height,
      detail,
      detail
    )

    const material = new CloudMaterial({
      scale: 50,
      displacement: 50,
      shadowColor: 0x09a3cf,
      color: 0xffffff,
      transparent: true,
      ...opts
    })
    geometry.rotateZ(Math.PI / 2)

    super(geometry, material)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.rotateZ(0.01)
  }

  getGUI() {
    return [[null, {target: this.material}]]
  }
}
