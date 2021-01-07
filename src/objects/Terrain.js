import * as THREE from "three";
import {compose} from '/lib/composeShaders'
import {includeGridShader} from '/materials/Grid'
import {includeTerrainShader} from '/materials/Terrain'

export class Terrain extends THREE.Object3D {
  constructor({
    size,
    segments = 25,
    color = 0x9c7448,
    gridColor = 0x6260eb
  } = {}) {
    super();

    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = new THREE.MeshPhysicalMaterial({
      color,
      flatShading: true,
      roughness: 0.5,
      reflectivity: 1.
    });
    material.onBeforeCompile = compose(
      includeTerrainShader({
        speed: 0.1,
        displacement: 100,
        pathSize: 0.1,
        dithering: true,
        step: segments / size
      }),
      includeGridShader({
        speed: 0.1,
        size: 11.5,
        color: gridColor
      })
    )
    this.add(new THREE.Mesh(geometry, material));
  }
}
