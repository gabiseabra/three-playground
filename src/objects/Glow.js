import * as THREE from "three";
import {AtmosphereMaterial} from './Atmosphere'

const scale = (geometry, x) => geometry.clone().scale(x, x, x)

export class InnerGlow extends THREE.Mesh {
  constructor(geometry, {
    color,
    power = 2.0,
    coefficient = 1.1
  }) {
    const material = new AtmosphereMaterial({
      color,
      power,
      coefficient
    })

    super(scale(geometry, 1.01), material);
  }
}

export class OuterGlow extends THREE.Mesh {
  constructor(geometry, {
    color,
    power = 4.0,
    coefficient = 0.2,
    radius = 0.3
  }) {
    const material = new AtmosphereMaterial({
      color,
      power,
      coefficient,
      side: THREE.BackSide
    })

    super(scale(geometry, 1 + radius), material)
  }
}
