import * as THREE from "three";
import { Light } from "/objects/Light";
import { InfiniteGrid } from "/objects/InfiniteGrid";
import { Horizon } from "/objects/Horizon";
import { DEG } from "./config";

export class Scene extends THREE.Scene {
  background = new THREE.Color(0xffeadb);

  constructor() {
    super();
    this.light = new Light()
    this.horizon = new Horizon()
    this.grid = new InfiniteGrid()
    this.grid.position.y = -10
    this.grid.position.z = -50
    // this.grid.rotateX(90 * DEG)

    for (const obj of [
      this.light,
      this.horizon,
      this.grid
    ]) {
      this.add(obj);
    }
  }
}
