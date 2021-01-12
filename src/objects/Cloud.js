import * as THREE from 'three'
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils'
import {MeshSurfaceSampler} from 'three/examples/jsm/math/MeshSurfaceSampler'
import {CloudMaterial} from '/materials/Cloud'
import {CapsuleBufferGeometry} from './CapsuleBufferGeometry'

export class Cloud extends THREE.Mesh {
  constructor({radius = 50, height = 200, detail = 16, ...opts} = {}) {
    const geometry = new RandomCloudGeometry(radius, height, detail)

    const material = new CloudMaterial({
      scale: 50,
      displacement: 50,
      shadowColor: 0x09a3cf,
      color: 0xffffff,
      reflectivity: 1,
      refractionRatio: 0,
      transparent: true,
      ...opts
    })

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

class RandomCloudGeometry extends THREE.Geometry {
  constructor(radius, height, detail) {
    super()

    const geom = new CapsuleBufferGeometry(
      radius,
      radius,
      height,
      detail * Math.PI,
      (detail / 4) * height,
      detail,
      detail
    )

    this.fromBufferGeometry(geom)
  }
}

const rand = (min, max) => min + Math.random() * (max - min)
