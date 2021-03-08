import * as THREE from 'three'
import {Clouds} from './Cloud'
import {Sky} from './Sky'
import {Sun} from './Sun'
import {Terrain} from './Terrain'

const ANGLE = Symbol('ANGLE')

export class World extends THREE.Object3D {
  sunPosition = new THREE.Vector3()
  sunRotation = Math.PI * 0.97

  constructor(config) {
    super()

    const sunPivot = new THREE.Object3D()
    sunPivot.name = 'sunPivot'
    this.add(sunPivot)

    const sun = new Sun(config.sun)
    sun.position.z = -config.sun.distance
    sunPivot.add(sun)

    const sunLight = config.lights.sun
    sunLight.position.z = -config.sun.distance
    sunPivot.add(sunLight)

    const worldLight = config.lights.world
    this.add(worldLight)

    const sky = new Sky(config.world)
    this.add(sky)

    const terrain = new Terrain({
      ...config.terrain,
      size: config.world.radius * 2
    })
    terrain.rotateX(-Math.PI / 2)
    this.add(terrain)

    const clouds = new Clouds({
      surfaceRadius: config.world.radius,
      ...config.cloud
    })
    this.add(clouds)

    this.sky = sky
    this.sunPivot = sunPivot

    this.sunDistance = config.sun.distance
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a

    this.sunAngle = THREE.MathUtils.lerp(
      Math.PI - this.sunRotation,
      this.sunRotation,
      a / Math.PI
    )

    this.sunPosition.z = Math.cos(this.sunAngle) * -this.sunDistance
    this.sunPosition.y = Math.sin(this.sunAngle) * this.sunDistance

    this.updateAngle()
  }

  updateAngle() {
    this.sunPivot.rotation.x = this.sunAngle
    this.sky.material.uniforms.sunPosition.value.copy(this.sunPosition)
  }
}
