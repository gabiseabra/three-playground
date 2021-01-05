import * as THREE from "three";
import vertexShader from './Fog.vert'
import fragmentShader from './Fog.frag'

export class FogMaterial extends THREE.ShaderMaterial {
  constructor({
    groundColor = new THREE.Color(0xfafafa)
  } = {}) {
    super({
      vertexShader,
      fragmentShader,
      blending: THREE.NoBlending,
      depthWrite: true,
      uniforms: {
        turbidity: { value: 1 },
        rayleigh: { value: 2 },
        mieCoefficient: { value: 0.0035 },
        mieDirectionalG: { value: 0.8 },
        sunPosition: { value: new THREE.Vector3(0, 100, -2000) },
        up: { value: new THREE.Vector3( 0, 1, 0 ) }
      },
    });
  }
}
