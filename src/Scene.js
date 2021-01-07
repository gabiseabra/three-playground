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
    const light = new WorldLight(WORLD_RADIUS)
    this.add(light)

    const sky = new Sky(WORLD_RADIUS)
    this.add(sky)

    const sun = new Sun(WORLD_RADIUS / 6)
    sun.position.set(0, WORLD_RADIUS / 8, -WORLD_RADIUS)
    this.add(sun)

    const terrain = new Terrain({ size: WORLD_RADIUS * 2 })
    terrain.rotateX(-90 * DEG)
    this.add(terrain)
  }
}
