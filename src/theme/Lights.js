import * as THREE from 'three'
import {animateObject3D} from '/lib/animateObject3D'

export class WorldLight extends THREE.Object3D {
  name = 'worldLight'

  constructor() {
    super()

    const hemisphere = new THREE.HemisphereLight(0xff9ed5, 0x57006b, 1.25)
    hemisphere.name = 'hemisphere'
    this.add(hemisphere)

    const ambient = new THREE.AmbientLight(0xe6179a, 0.5)
    ambient.name = 'ambient'
    this.add(ambient)

    const directional = new THREE.DirectionalLight(0xff9ed5, 0.4)
    directional.name = 'directional'
    this.add(directional)

    this.hemisphere = hemisphere
    this.ambient = ambient
    this.directional = directional
  }

  getGUI() {
    return [
      ['hemisphere', {target: this.hemisphere}],
      ['ambient', {target: this.ambient}],
      ['directional', {target: this.directional}]
    ]
  }
}

export class SunLight extends THREE.Object3D {
  state = 0
  speed = 0.05

  constructor() {
    super()

    const point = new THREE.PointLight(0x7d0700, 100, 5000, 10)
    point.name = 'sunLight'
    this.add(point)

    animateObject3D(this)

    this.point = point
  }

  onBeforeRender() {
    this.state += this.speed
    this.point.position.x = 10 * Math.sin(this.state)
  }
}

export class CameraLight extends THREE.Object3D {
  constructor() {
    super()
    const point = new THREE.PointLight(0x0000ff, 10, 1000, 10)
    point.name = 'cameraLight'
    this.add(point)
  }
}
