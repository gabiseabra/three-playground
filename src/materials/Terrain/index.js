import * as THREE from 'three'
import VERTEX_HELPERS from './Terrain.vert'
import FRAGMENT_HELPERS from './Terrain.frag'

const BEGIN_VERTEX = `
#include <begin_vertex>

// transformedNormal = normalMatrix * calcNormal(uv);
transformed = calcPosition(transformed, uv);
`

const CLIPPING_PLANES_FRAGMENT = `
#include <clipping_planes_fragment>

if (clipCircle(vUv)) discard;
`

export const includeTerrainShader = ({
    step,
    speed = 0.5,
    displacement = 5,
    pathSize = 0,
  } = {}) => function (shader) {
  this.uTime = new THREE.Uniform(0)

  Object.assign(shader.uniforms, {
    time: this.uTime,
    uSpeed: new THREE.Uniform(speed),
    uDisplacement: new THREE.Uniform(displacement),
    uPathSize: new THREE.Uniform(pathSize),
    uStep: new THREE.Uniform(step)
  })

  console.log(shader.fragmentShader)
  shader.defines = { USE_UV: true };
  shader.vertexShader = `${VERTEX_HELPERS}\n` + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', BEGIN_VERTEX);
  shader.fragmentShader = `${FRAGMENT_HELPERS}\n` + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_fragment>', CLIPPING_PLANES_FRAGMENT);
}
