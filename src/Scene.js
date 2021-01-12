import * as THREE from 'three'
import {Clouds} from '/objects/Cloud'
import {Sky} from '/objects/Sky'
import {Sun} from '/objects/Sun'
import {Terrain} from '/objects/Terrain'

const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t

const ANGLE = Symbol('ANGLE')

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb)
  sunPosition = new THREE.Vector3()
  sunRotation = Math.PI * 0.97
  cameraRotation = Math.PI
  cameraAxis = new THREE.Vector3(1, 0, 1)

  constructor({camera, config}) {
    super()

    const sunPivot = new THREE.Object3D()
    this.add(sunPivot)

    const sun = new Sun(config.sun)
    sun.position.z = -config.sun.distance
    sunPivot.add(sun)

    const sunLight = config.lights.sun
    sunLight.position.z = -config.sun.distance
    sunPivot.add(sunLight)

    const worldLight = config.lights.world
    this.add(worldLight)

    const cameraLight = config.lights.camera
    camera.add(cameraLight)
    camera.position.y = 50
    this.add(camera)

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
    clouds.name = 'cloud'
    this.add(clouds)

    this.sky = sky
    this.sunPivot = sunPivot
    this.camera = camera

    this.sunDistance = config.sun.distance
    this.angle = Math.PI
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    const d = a - (this.angle || 0)

    this[ANGLE] = a
    this.cameraAngle = lerp(
      Math.PI - this.cameraRotation,
      this.cameraRotation,
      a / Math.PI
    )
    this.sunAngle = lerp(
      Math.PI - this.sunRotation,
      this.sunRotation,
      a / Math.PI
    )

    this.updateSun(d)
    this.updateCamera(d)
  }

  updateSun() {
    this.sunPosition.z = Math.cos(this.sunAngle) * -this.sunDistance
    this.sunPosition.y = Math.sin(this.sunAngle) * this.sunDistance
    this.sunPivot.rotation.x = this.sunAngle

    this.sky.material.uniforms.sunPosition.value.copy(this.sunPosition)
  }

  updateCamera() {
    const r = this.cameraAxis.clone().multiplyScalar(this.cameraAngle)
    this.camera.rotation.set(r.x, r.y, r.z)
  }

  getGUI() {
    return [['angle', {min: 0, max: Math.PI}]]
  }
}
