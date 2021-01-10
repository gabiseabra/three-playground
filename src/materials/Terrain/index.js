import * as THREE from 'three'
import VERTEX from './Terrain.vert'
import FRAGMENT from './Terrain.frag'

export class TerrainMaterial extends THREE.MeshPhysicalMaterial {
  constructor({
    speed = 0.1,
    displacement = 5,
    vertexStep,
    pathSize,
    gridSize,
    gridColor,
    ...opts
  }) {
    super(opts)

    this.uniforms = {
      time: new THREE.Uniform(0),
      speed: new THREE.Uniform(speed),
      displacement: new THREE.Uniform(displacement),
      vertexStep: new THREE.Uniform(vertexStep),
      pathSize: new THREE.Uniform(pathSize),
      gridSize: new THREE.Uniform(gridSize),
      gridColor: new THREE.Uniform(new THREE.Color(gridColor))
    }
  }

  onBeforeCompile(shader) {
    Object.assign(shader.uniforms, this.uniforms)

    shader.defines = {USE_UV: true}
    shader.vertexShader = `${VERTEX}\n` + shader.vertexShader
    shader.vertexShader = shader.vertexShader
      .replace('#include <begin_vertex>', BEGIN_VERTEX)
      .replace('#include <worldpos_vertex>', WORLDPOS_VERTEX)

    shader.fragmentShader = `${FRAGMENT}\n` + shader.fragmentShader
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <clipping_planes_fragment>', CLIPPING_PLANES_FRAGMENT)
      .replace(/(^\s*gl_FragColor\s*=.+;)/m, `$&\n${COLOR_FRAGMENT}`)
  }

  getGUI() {
    return [
      ['color'],
      ['uniforms.gridColor'],
      ['emissive'],
      ['emissiveIntensity', {min: 0, max: 1}],
      ['uniforms.displacement', {min: 0, max: 200}],
      ['uniforms.pathSize', {min: 0, max: 100}],
      ['uniforms.gridSize', {min: 0, max: 100}],
      ['uniforms.speed', {min: 0, max: 10, step: 0.01}]
    ]
  }
}

const BEGIN_VERTEX = `
#include <begin_vertex>

transformedNormal = normalMatrix * calcNormal();
transformed = calcPosition();
`

const CLIPPING_PLANES_FRAGMENT = `
#include <clipping_planes_fragment>

if (clipCircle(vUv)) discard;
`

const WORLDPOS_VERTEX = `
#include <worldpos_vertex>

vPos = transformed;
`

const COLOR_FRAGMENT = `
gl_FragColor.rgb = mix(gl_FragColor.rgb, gridColor.rgb, calcGrid());
`
