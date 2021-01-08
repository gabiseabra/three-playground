import * as THREE from 'three'
import {AtmosphereMaterial} from '/materials/Atmosphere'

export class Sky extends THREE.Mesh {
  name = 'sky'

  constructor({radius}) {
    const geometry = new THREE.SphereBufferGeometry(1, 25, 25)
    const material = new AtmosphereMaterial()
    material.side = THREE.BackSide
    material.fog = false
    material.depthWrite = false
    super(geometry, material)
    this.scale.setScalar(radius)
  }
}
