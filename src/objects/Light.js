import * as THREE from "three";
import { pivot } from '/lib/pivot'
import {
  HEMISPHERE_LIGHT,
  AMBIENT_LIGHT,
  DIRECTIONAL_LIGHT,
  POINT_LIGHT,
  CAMERA_LIGHT
} from '/config'

export class WorldLight extends THREE.Object3D {
  name = 'light'
  pointPosition = 0
  pointSpeed = 0.05

  constructor() {
    super()

    const hemisphere = HEMISPHERE_LIGHT.clone()
    hemisphere.name = 'hemisphere'
    this.add(hemisphere);

    const ambient = AMBIENT_LIGHT.clone()
    ambient.name = 'ambient'
    this.add(ambient);

    const directional = DIRECTIONAL_LIGHT.clone()
    directional.name = 'directional'
    this.add(directional);

    const point = POINT_LIGHT.clone()
    point.name = 'point'
    this.add(pivot(point))

    this.point = point
  }

  animate() {
    this.pointPosition += this.pointSpeed
    this.point.position.x = 10 * Math.sin(this.pointPosition)
  }
}

export class CameraLight extends THREE.Object3D {
  name = 'light'

  constructor() {
    super()
    const point = CAMERA_LIGHT.clone()
    point.name = 'point'
    this.add(point);
  }
}
