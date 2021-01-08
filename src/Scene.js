import * as THREE from "three";
import { WorldLight, SunLight, CameraLight } from "/objects/Light";
import { Sky } from "/objects/Sky";
import { Sun } from "/objects/Sun";
import { Terrain } from "/objects/Terrain";
import { WORLD_RADIUS, SUN_DISTANCE, DEG } from "./config";

const ANGLE = Symbol('ANGLE')

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);
  sunPosition = new THREE.Vector3()

  constructor(camera) {
    super()

    const sunPivot = new THREE.Group()
    this.add(sunPivot)

    const sun = new Sun({
      radius: WORLD_RADIUS / 6
    })
    sun.position.z = -SUN_DISTANCE
    sunPivot.add(sun)

    const sunLight = new SunLight()
    sunLight.position.z = -SUN_DISTANCE
    sunPivot.add(sunLight)

    const worldLight = new WorldLight()
    this.add(worldLight)

    const cameraLight = new CameraLight()
    camera.add(cameraLight)
    this.add(camera)

    const sky = new Sky(WORLD_RADIUS)
    this.add(sky)

    const terrain = new Terrain({ size: WORLD_RADIUS * 2 })
    terrain.rotateX(-90 * DEG)
    this.add(terrain)

    this.camera = camera
    this.sunPivot = sunPivot
    this.sky = sky
    this.angle = Math.PI / 24
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a
    this.sunPosition.z = Math.cos(a) * -WORLD_RADIUS
    this.sunPosition.y = Math.sin(a) * WORLD_RADIUS

    this.sunPivot.rotation.x = a
    this.sky.material.uniforms.sunPosition.value.copy(this.sunPosition)
    this.camera.lookAt(this.sunPosition)
  }

  getGUI() {
    return [
      ['angle', {min: 0, max: Math.PI}]
    ]
  }
}
