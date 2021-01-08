import { WorldLight, SunLight, CameraLight } from './Lights'

const WORLD_RADIUS = 1500
const SUN_DISTANCE = WORLD_RADIUS + 400

export default {
  world: {
    radius: WORLD_RADIUS
  },
  camera: {
    fov: 45,
    near: 50,
    far: WORLD_RADIUS * 5
  },
  lights: {
    world: new WorldLight(),
    sun: new SunLight(),
    camera: new CameraLight()
  },
  terrain: {
    color: 0x6c784a,
    emissive: 0xff2d00
  },
  sun: {
    color: 0xf79b5e,
    glowColor: 0xed4577,
    emissiveIntensity: .5,
    radius: WORLD_RADIUS / 6,
    distance: -SUN_DISTANCE
  }
}
