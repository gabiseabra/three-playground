import * as THREE from "three";
import vertexShader from './Atmosphere.vert'
import fragmentShader from './Atmosphere.frag'

export class AtmosphereMaterial extends THREE.ShaderMaterial {
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
        color: new THREE.Uniform(color),
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blendFunction,
      side
    });
  }
}
