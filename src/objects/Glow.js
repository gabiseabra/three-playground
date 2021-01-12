import * as THREE from 'three'
import {GlowMaterial} from '../materials/Glow'

const scale = (geometry, x) => geometry.clone().scale(x, x, x)

export class InnerGlow extends THREE.Mesh {
  constructor(
    geometry,
    {color, blendFunction, power = 2.0, coefficient = 1.1}
  ) {
    const material = new GlowMaterial({
      color,
      power,
      blendFunction,
      coefficient
    })

    super(scale(geometry, 1.01), material)
  }
}

export class OuterGlow extends THREE.Mesh {
  constructor(
    geometry,
    {color, blendFunction, power = 4.0, coefficient = 0.2, radius = 0.3}
  ) {
    const material = new GlowMaterial({
      color,
      power,
      coefficient,
      blendFunction,
      side: THREE.BackSide
    })

    super(scale(geometry, 1 + radius), material)
  }
}
