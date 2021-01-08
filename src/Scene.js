import * as THREE from "three";
import { Sky } from "/objects/Sky";
import { Sun } from "/objects/Sun";
import { Terrain } from "/objects/Terrain";

const ANGLE = Symbol('ANGLE')

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);
  sunPosition = new THREE.Vector3()

  constructor({ camera, config }) {
    super()

    const sunPivot = new THREE.Object3D()
    this.add(sunPivot)

    const sun = new Sun(config.sun)
    sun.position.z = config.sun.distance
    sunPivot.add(sun)

    const sunLight = config.lights.sun
    sunLight.position.z = config.sun.distance
    sunPivot.add(sunLight)

    const worldLight = config.lights.world
    this.add(worldLight)

    const cameraLight = config.lights.camera
    camera.add(cameraLight)
    this.add(camera)

    const sky = new Sky(config.world)
    this.add(sky)

    const terrain = new Terrain({
      ...config.terrain,
      size: config.world.radius * 2
    })
    terrain.rotateX(-Math.PI / 2)
    this.add(terrain)

    this.sky = sky
    this.sunPivot = sunPivot
    this.camera = camera

    this.worldRadius = config.world.radius
    this.angle = Math.PI / 24
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a
    this.sunPosition.z = Math.cos(a) * -this.worldRadius
    this.sunPosition.y = Math.sin(a) * this.worldRadius

    this.updateAngle()
  }
  
  updateAngle() {
    this.sunPivot.rotation.x = this.angle
    this.sky.material.uniforms.sunPosition.value.copy(this.sunPosition)
    this.camera.lookAt(this.sunPosition)
  }

  getGUI() {
    return [
      ['angle', {min: 0, max: Math.PI}]
    ]
  }
}
