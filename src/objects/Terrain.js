import * as THREE from "three";
import {compose} from '/lib/composeShaders'
import {includeGridShader} from '/materials/Grid'
import {includeTerrainShader} from '/materials/Terrain'
import { TERRAIN_MATERIAL } from '/config'

export class Terrain extends THREE.Mesh {
  name = 'terrain'

  constructor({
    size,
    segments = 25,
    color = 0x9c7448,
    gridColor = 0x6260eb
  } = {}) {
    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = TERRAIN_MATERIAL.clone();
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
        size: 11,
        color: gridColor
      })
    )
    super(geometry, material);
  }
}
