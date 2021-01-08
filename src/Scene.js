import * as THREE from "three";
import { WorldLight } from "/objects/Light";
import { Sky } from "/objects/Sky";
import { Sun } from "/objects/Sun";
import { Terrain } from "/objects/Terrain";
import { WORLD_RADIUS, DEG } from "./config";

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);

  constructor() {
    super()
    const sun = new Sun(WORLD_RADIUS / 6, -WORLD_RADIUS, 6 * DEG)
    this.add(sun)

    console.log(sun.position)
    const light = new WorldLight(WORLD_RADIUS)
    this.add(light)

    const sky = new Sky(WORLD_RADIUS)
    sky.material.uniforms.sunPosition.value = sun.position
    this.add(sky)

    const terrain = new Terrain({ size: WORLD_RADIUS * 2 })
    terrain.rotateX(-90 * DEG)
    this.add(terrain)
  }
}
