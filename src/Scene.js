import * as THREE from "three";
import { Light } from "/objects/Light";
import { InfiniteGrid } from "/objects/InfiniteGrid";
import { Horizon } from "/objects/Horizon";
import { Sky } from "/objects/Sky";
import { DEG } from "./config";

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);

  constructor() {
    super();
    this.sky = new Sky()
    this.light = new Light()
    this.horizon = new Horizon()
    this.grid = new InfiniteGrid()

    this.horizon.position.y = 100
    this.horizon.position.z = -1000
    this.horizon.scale.setScalar(10)

    for (const obj of [
      this.sky,
      this.light,
      this.horizon,
      this.grid
    ]) {
      this.add(obj);
    }
  }
}
