import * as THREE from 'three'
import VERTEX_HELPERS from './Terrain.vert'
import FRAGMENT_HELPERS from './Terrain.frag'

const BEGIN_VERTEX = `
#include <begin_vertex>

transformedNormal = normalMatrix * calcNormal();
transformed = calcPosition();
`

const CLIPPING_PLANES_FRAGMENT = `
#include <clipping_planes_fragment>

if (clipCircle(vUv)) discard;
`

export const includeTerrainShader = ({
    time,
    step,
    speed = new THREE.Uniform(0.1),
    displacement = new THREE.Uniform(5),
    pathSize = new THREE.Uniform(0),
  } = {}) => function (shader) {
  Object.assign(shader.uniforms, {
    time: time,
    uSpeed: speed,
    uDisplacement: displacement,
    uPathSize: pathSize,
    uStep: step
  })

  shader.defines = { USE_UV: true };
  shader.vertexShader = `${VERTEX_HELPERS}\n` + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', BEGIN_VERTEX);
  shader.fragmentShader = `${FRAGMENT_HELPERS}\n` + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_fragment>', CLIPPING_PLANES_FRAGMENT);
}
