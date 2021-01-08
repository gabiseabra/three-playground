import * as THREE from 'three'
import VERTEX_HELPERS from './Grid.vert'
import FRAGMENT_HELPERS from './Grid.frag'

const WORLDPOS_VERTEX = `
#include <worldpos_vertex>

vPos = transformed;
`

const COLOR_FRAGMENT = `
float line = grid(vPos, vec3(1.0, 1.0, 0.0), uSize);
gl_FragColor.rgb = mix(gl_FragColor.rgb, uColor.rgb, line);
`

export const includeGridShader = ({
    uTime,
    color = 0x000000,
    speed = .5,
    size = 10,
  } = {}) => function (shader) {
  Object.assign(shader.uniforms, {
    time: uTime,
    uColor: new THREE.Uniform(new THREE.Color(color)),
    uSpeed: new THREE.Uniform(speed),
    uSize: new THREE.Uniform(size)
  })

  shader.vertexShader = `${VERTEX_HELPERS}\n` + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    '#include <worldpos_vertex>',
    WORLDPOS_VERTEX
  )
  shader.fragmentShader = `${FRAGMENT_HELPERS}\n` + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace(
    /(^\s*gl_FragColor\s*=.+;)/m,
    `$&\n${COLOR_FRAGMENT}`
  );
}
