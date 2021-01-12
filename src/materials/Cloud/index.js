import * as THREE from 'three'
import VERTEX from './Cloud.vert'
import FRAGMENT from './Cloud.frag'

export class CloudMaterial extends THREE.MeshLambertMaterial {
  constructor({
    scale = 5,
    displacement = 5,
    center = 0.5,
    shadowColor,
    ...opts
  }) {
    super(opts)

    this.uniforms = {
      shadowColor: new THREE.Uniform(new THREE.Color(shadowColor)),
      displacement: new THREE.Uniform(displacement),
      scale: new THREE.Uniform(scale),
      power: new THREE.Uniform(1),
      center: new THREE.Uniform(center)
    }
  }

  onBeforeCompile(shader) {
    Object.assign(shader.uniforms, this.uniforms)

    shader.defines = {USE_UV: true}
    shader.vertexShader = `${VERTEX}\n` + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      BEGIN_VERTEX
    )

    shader.fragmentShader =
      `${FRAGMENT}\n` +
      shader.fragmentShader.replace(
        /(^\s*gl_FragColor\s*=.+;)/m,
        `$&\n${COLOR_FRAGMENT}`
      )
  }

  getGUI() {
    return [
      ['color'],
      ['uniforms.shadowColor'],
      ['uniforms.power', {min: 0, max: 10}],
      ['uniforms.displacement', {min: 0, max: 100}],
      ['uniforms.scale', {min: 1, max: 100}]
    ]
  }
}

const BEGIN_VERTEX = `
#include <begin_vertex>

transformed = calcPosition();
`

const COLOR_FRAGMENT = `
gl_FragColor = calcColor();
`
