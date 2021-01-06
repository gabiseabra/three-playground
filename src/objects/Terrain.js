import * as THREE from "three";
import {compose} from '/lib/composeShaders'
import {includeGridShader} from '/materials/Grid'
import {includeTerrainShader} from '/materials/Terrain'

export class Terrain extends THREE.Object3D {
  constructor({
    size = 2000,
    segments = 25
  } = {}) {
    super();

    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x6260eb,
      flatShading: true
    });
    material.onBeforeCompile = compose(
      includeTerrainShader({
        speed: 0.1,
        displacement: 12,
        pathSize: 0.05,
        dithering: true,
        step: segments / size
      }),
      includeGridShader({
        speed: 0.1,
        size: 11.5
      })
    )
    this.add(new THREE.Mesh(geometry, material));
  }
}
