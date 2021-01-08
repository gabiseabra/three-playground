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
    gridColor = 0x6260eb
  } = {}) {
    const uTime = new THREE.Uniform(0)
    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = TERRAIN_MATERIAL.clone();
    material.onBeforeCompile = compose(
      includeTerrainShader({
        uTime,
        speed: 0.1,
        displacement: 100,
        pathSize: 0.1,
        dithering: true,
        step: segments / size
      }),
      includeGridShader({
        uTime,
        speed: 0.1,
        size: 11,
        color: gridColor
      })
    )

    super(geometry, material)

    this.uTime = uTime
    console.log(this.uTime)
  }

  animate(t) {
    this.uTime.value += t
  }
}
