import * as THREE from "three";
import {compose} from '/lib/composeShaders'
import {includeGridShader} from '/materials/Grid'
import {includeTerrainShader} from '/materials/Terrain'

export class Terrain extends THREE.Mesh {
  name = 'terrain'
  speed = 0.01

  constructor({
    size,
    color,
    emissive,
    emissiveIntensity,
    segments = 25,
    gridColor = 0x6260eb
  }) {
    const uTime = new THREE.Uniform(0)

    const geometry = new THREE.PlaneBufferGeometry(size, size, segments, segments);

    const material = new THREE.MeshPhysicalMaterial({
      color,
      emissive,
      emissiveIntensity,
      flatShading: true,
      roughness: 0.5,
      reflectivity: 1.
    });
    material.onBeforeCompile = compose(
      includeTerrainShader({
        uTime,
        displacement: 110,
        pathSize: 0.1,
        step: segments / size
      }),
      includeGridShader({
        uTime,
        size: 11,
        color: gridColor
      })
    )

    super(geometry, material)

    this.clock = new THREE.Clock()
    this.uTime = uTime
  }

  onBeforeRender() {
    this.uTime.value += this.clock.getDelta()
  }
}
