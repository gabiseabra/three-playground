import * as THREE from "three";
import { WorldLight } from "/objects/Light";
import { Sky } from "/objects/Sky";
import { Sun } from "/objects/Sun";
import { Terrain } from "/objects/Terrain";
import { pivot } from '/lib/pivot'
import { WORLD_RADIUS, SUN_DISTANCE, DEG } from "./config";

const ANGLE = Symbol('ANGLE')

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);
  sunPosition = new THREE.Vector3()

  constructor(camera) {
    super()

    const sun = new Sun(WORLD_RADIUS / 6)
    sun.position.z = -SUN_DISTANCE
    this.add(pivot(sun))
    
    const light = new WorldLight(-WORLD_RADIUS)
    this.add(light)

    const sky = new Sky(WORLD_RADIUS)
    this.add(sky)

    const terrain = new Terrain({ size: WORLD_RADIUS * 2 })
    terrain.rotateX(-90 * DEG)
    this.add(terrain)

    this.camera = camera
    this.angle = Math.PI / 24
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a
    this.sunPosition.z = Math.cos(a) * -WORLD_RADIUS
    this.sunPosition.y = Math.sin(a) * WORLD_RADIUS

    this.getObjectByName('sunPivot').rotation.x = a
    this.getObjectByName('pointPivot').rotation.x = a
    this.getObjectByName('sky').material.uniforms.sunPosition.value.copy(this.sunPosition)
    this.camera.lookAt(this.sunPosition)
  }

  getGUI() {
    return [
      {prop: 'angle', min: 0, max: Math.PI}
    ]
  }
}
