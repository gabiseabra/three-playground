import * as THREE from "three";
import { Light } from "/objects/Light";
import { Sky } from "/objects/Sky";
import { Horizon } from "/objects/Horizon";
import { Terrain } from "/objects/Terrain";
import { DEG } from "./config";

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);

  constructor() {
    super();
    this.sky = new Sky()
    this.light = new Light()

    this.terrain = new Terrain()
    this.terrain.rotateX(-90 * DEG)
    
    this.horizon = new Horizon()
    this.horizon.position.y = 100
    this.horizon.position.z = -1000
    this.horizon.scale.setScalar(10)

    for (const obj of [
      this.sky,
      this.light,
      this.horizon,
      this.terrain
    ]) {
      this.add(obj);
    }
  }
}
