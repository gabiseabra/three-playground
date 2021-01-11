import * as THREE from 'three'
import {CloudMaterial} from '/materials/Cloud'
import {CapsuleBufferGeometry} from './CapsuleBufferGeometry'

export class Cloud extends THREE.Mesh {
  constructor({radius = 50, height = 200, detail = 32} = {}) {
    const geometry = new CapsuleBufferGeometry(
      radius,
      radius,
      height,
      detail * Math.PI,
      detail,
      detail,
      detail
    )

    const material = new CloudMaterial({
      scale: 50,
      displacement: 50,
      color: 0xf0f0f0,
      reflectivity: 1,
      refractionRatio: 0
    })

    super(geometry, material)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.rotateZ(0.01)
  }

  getGUI() {}
}

const rand = (min, max) => min + Math.random() * (max - min)
