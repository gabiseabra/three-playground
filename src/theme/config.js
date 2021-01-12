import {WorldLight, SunLight, CameraLight} from './Lights'

const WORLD_RADIUS = 1500
const SUN_DISTANCE = WORLD_RADIUS + 400

export default {
  world: {
    radius: WORLD_RADIUS,
    turbidity: 1,
    rayleigh: 7,
    mieCoefficient: 0.0035,
    mieDirectionalG: 0.8
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
    color: 0x895c5c,
    emissive: 0xff2d00
  },
  sun: {
    glowColor: 0xed4577,
    color: 0xfc8870,
    emissive: 0xf2063b,
    emissiveIntensity: 0.5,
    radius: WORLD_RADIUS / 6,
    distance: SUN_DISTANCE
  },
  cloud: {
    power: 1.5,
    count: 10,
    scale: 60,
    displacement: 50,
    detail: 16,
    color: 0xfcfcff,
    shadowColor: 0x606060,
    transparent: true,
    surfaceOffset: 200
  }
}
