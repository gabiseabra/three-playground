import * as THREE from 'three'
import {compose} from '/lib/composeShaders'
import {includeGridShader} from '/materials/Grid'
import {includeTerrainShader} from '/materials/Terrain'

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
    const uniforms = {
      time: new THREE.Uniform(0),
      displacement: new THREE.Uniform(100),
      pathSize: new THREE.Uniform(0.1),
      gridSize: new THREE.Uniform(11),
      gridColor: new THREE.Uniform(new THREE.Color(gridColor))
    }

    const geometry = new THREE.PlaneBufferGeometry(
      size,
      size,
      segments,
      segments
    )

    const material = new THREE.MeshPhysicalMaterial({
      color,
      emissive,
      emissiveIntensity,
      flatShading: true,
      roughness: 0.5,
      reflectivity: 1
    })
    material.onBeforeCompile = compose(
      includeTerrainShader({
        time: uniforms.time,
        displacement: uniforms.displacement,
        pathSize: uniforms.pathSize,
        step: segments / size
      }),
      includeGridShader({
        time: uniforms.time,
        size: uniforms.gridSize,
        color: uniforms.gridColor
      })
    )

    super(geometry, material)

    this.clock = new THREE.Clock()
    this.uniforms = uniforms
  }

  onBeforeRender() {
    this.uniforms.time.value += this.clock.getDelta()
  }

  getGUI() {
    return [
      [null, {target: this.material}],
      ['uniforms.gridColor'],
      ['uniforms.gridSize', {min: 1, max: 100}],
      ['uniforms.displacement', {min: 0, max: 200}],
      ['uniforms.pathSize', {min: 0.05, max: 1}]
    ]
  }
}
