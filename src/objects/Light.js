import * as THREE from "three";
import { animateObject3D } from '/lib/animateObject3D'
import {
  HEMISPHERE_LIGHT,
  AMBIENT_LIGHT,
  DIRECTIONAL_LIGHT,
  POINT_LIGHT,
  CAMERA_LIGHT
} from '/config'

export class WorldLight extends THREE.Object3D {
  name = 'light'

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
  }
}

export class SunLight extends THREE.Object3D {
  state = 0
  speed = 0.05

  constructor() {
    super()

    const point = POINT_LIGHT.clone()
    point.name = 'sunLight'
    this.add(point)

    animateObject3D(this)

    this.point = point
  }

  onBeforeRender() {
    this.state += this.speed
    this.point.position.x = 10 * Math.sin(this.state)
  }
}

export class CameraLight extends THREE.Object3D {
  name = 'light'

  constructor() {
    super()
    const point = CAMERA_LIGHT.clone()
    point.name = 'cameraLight'
    this.add(point);
  }
}
