import * as THREE from "three";
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
    
    const point = POINT_LIGHT.clone()
    point.name = 'point'
    this.add(point);
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
