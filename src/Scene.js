import * as THREE from 'three'
import {World} from './objects/World'
import {CameraController} from './objects/CameraController'

const ANGLE = Symbol('ANGLE')

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb)

  constructor({camera, config}) {
    super()

    this.add(new CameraController(camera, config))
    this.add(new World(config))

    this.angle = Math.PI
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a
    this.children.forEach((c) => {
      c.angle = a
    })
  }

  getGUI() {
    return [['angle', {min: 0, max: Math.PI}]]
  }
}
