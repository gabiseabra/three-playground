import * as THREE from 'three'
import vertexShader from './Atmosphere.vert'
import fragmentShader from './Atmosphere.frag'

export class AtmosphereMaterial extends THREE.ShaderMaterial {
  constructor({
    turbidity = 1,
    rayleigh = 37,
    mieCoefficient = 0.0035,
    mieDirectionalG = 0.8
  }) {
    super({
      vertexShader,
      fragmentShader,
      blending: THREE.NoBlending,
      depthWrite: true,
      depthTest: true,
      uniforms: {
        turbidity: new THREE.Uniform(turbidity),
        rayleigh: new THREE.Uniform(rayleigh),
        mieCoefficient: new THREE.Uniform(mieCoefficient),
        mieDirectionalG: new THREE.Uniform(mieDirectionalG),
        sunPosition: new THREE.Uniform(new THREE.Vector3()),
        up: new THREE.Uniform(new THREE.Vector3(0, 1, 0))
      }
    })
  }

  getGUI() {
    return [
      ['uniforms.turbidity', {min: 0, max: 1}],
      ['uniforms.rayleigh', {min: 0, max: 100}],
      ['uniforms.mieCoefficient', {min: 0, max: 1}],
      ['uniforms.mieDirectionalG', {min: 0, max: 1}]
    ]
  }
}
