import * as THREE from 'three'
import VERTEX from './Cloud.vert'

export class CloudMaterial extends THREE.MeshBasicMaterial {
  constructor({scale = 5, displacement = 5, ...opts}) {
    super(opts)

    this.uniforms = {
      displacement: new THREE.Uniform(displacement),
      scale: new THREE.Uniform(scale)
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

    shader.fragmentShader = 'varying float vNoise;\n' + shader.fragmentShader
    shader.fragmentShader = shader.fragmentShader.replace(
      /(^\s*gl_FragColor\s*=.+;)/m,
      `$&\n${COLOR_FRAGMENT}`
    )
  }
}

const BEGIN_VERTEX = `
#include <begin_vertex>

// transformedNormal = normalMatrix * calcNormal();
transformed = calcPosition();
`

const COLOR_FRAGMENT = `
float d = smoothstep(0.4, 1., 1. - vNoise) * .2;
gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.), d);
`
