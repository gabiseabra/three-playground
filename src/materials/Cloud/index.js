import * as THREE from 'three'
import VERTEX from './Cloud.vert'
import FRAGMENT from './Cloud.frag'

export class CloudMaterial extends THREE.MeshLambertMaterial {
  constructor({
    scale = 5,
    displacement = 5,
    center = 0.5,
    shadowColor = 0x000000,
    ...opts
  }) {
    super({color: 0xffffff})

    this.uniforms = {
      shadowColor: new THREE.Uniform(new THREE.Color(shadowColor)),
      displacement: new THREE.Uniform(displacement),
      scale: new THREE.Uniform(scale),
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

    shader.fragmentShader = FRAGMENT + shader.fragmentShader
  }
}

const BEGIN_VERTEX = `
#include <begin_vertex>

transformed = calcPosition();
`

const COLOR_FRAGMENT = `
gl_FragColor = calcColor();
`
