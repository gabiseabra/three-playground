import * as THREE from 'three'
import {TerrainMaterial} from '../materials/Terrain'

export class Terrain extends THREE.Mesh {
  name = 'terrain'

  constructor({
    size,
    color,
    emissive,
    emissiveIntensity,
    segments = 25,
    gridColor = 0x6260eb
  }) {
    const geometry = new THREE.PlaneBufferGeometry(
      size,
      size,
      segments,
      segments
    )

    const material = new TerrainMaterial({
      color,
      emissive,
      emissiveIntensity,
      flatShading: true,
      roughness: 0.5,
      reflectivity: 1,
      displacement: 100,
      pathSize: 0.1,
      vertexStep: segments / size,
      gridSize: 11,
      gridColor
    })

    super(geometry, material)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.material.uniforms.time.value += this.clock.getDelta()
  }

  getGUI() {
    return [[null, {target: this.material}]]
  }
}
