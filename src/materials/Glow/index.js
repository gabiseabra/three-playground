import * as THREE from 'three'
import vertexShader from './Glow.vert'
import fragmentShader from './Glow.frag'

export class GlowMaterial extends THREE.ShaderMaterial {
  constructor({
    color,
    power,
    coefficient,
    side = THREE.FrontSide,
    blendFunction = THREE.NormalBlending
  }) {
    super({
      uniforms: {
        coefficient: new THREE.Uniform(coefficient),
        power: new THREE.Uniform(power),
        color: new THREE.Uniform(new THREE.Color(color))
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blendFunction,
      side
    })
  }
}
