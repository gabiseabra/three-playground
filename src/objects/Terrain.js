import * as THREE from "three";
import {includeTerrainShader} from '/materials/Terrain'

export class Terrain extends THREE.Object3D {
  constructor({
    size = 2000,
    segments = 25
  } = {}) {
    super();

    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = new THREE.MeshNormalMaterial({
      // color: 0x6260eb,
      flatShading: true
    });
    material.onBeforeCompile = includeTerrainShader({
      speed: 0.1,
      displacement: 15,
      pathSize: 0.04,
      dithering: true,
      step: segments / size
    })
    this.add(new THREE.Mesh(geometry, material));
  }
}
