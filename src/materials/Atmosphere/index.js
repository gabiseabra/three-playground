import * as THREE from "three";
import vertexShader from './Atmosphere.vert'
import fragmentShader from './Atmosphere.frag'

export class AtmosphereMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      blending: THREE.NoBlending,
      depthWrite: true,
      depthTest: true,
      uniforms: {
        turbidity: new THREE.Uniform(1),
        rayleigh: new THREE.Uniform(37),
        mieCoefficient: new THREE.Uniform(0.0035),
        mieDirectionalG: new THREE.Uniform(0.8),
        sunPosition: new THREE.Uniform(new THREE.Vector3()),
        up: new THREE.Uniform(new THREE.Vector3( 0, 1, 0 ))
      },
    });
  }

  getGUI() {
    return [
      {prop: 'uniforms.turbidity', min: 0, max: 1},
      {prop: 'uniforms.rayleigh', min: 0, max: 100},
      {prop: 'uniforms.mieCoefficient', min: 0, max: 1},
      {prop: 'uniforms.mieDirectionalG', min: 0, max: 1},
    ]
  }
}
