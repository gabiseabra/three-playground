import * as THREE from "three";

// constants
export const DEG = Math.PI / 180

// scale
export const WORLD_RADIUS = 1500
export const SUN_DISTANCE = WORLD_RADIUS * 1.15

// perspective
export const CAM_FOV = 45
export const CAM_NEAR = 50
export const CAM_FAR = WORLD_RADIUS * 5
export const CAM_DELTA = CAM_FAR - CAM_NEAR
export const Z0 = 0
export const Z1 = 50

// Lights
export const HEMISPHERE_LIGHT = new THREE.HemisphereLight(0xff9ed5, 0x57006b, 1.25)
export const AMBIENT_LIGHT = new THREE.AmbientLight(0xe6179a, 0.5)
export const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xff9ed5, 0.4);
DIRECTIONAL_LIGHT.position.set(0,1,0.25).normalize()
export const POINT_LIGHT = new THREE.PointLight(0x7d0700, 100, WORLD_RADIUS * 3, 10)
export const CAMERA_LIGHT = new THREE.PointLight(0x0000ff, 10, WORLD_RADIUS, 10)

// Materials
export const TERRAIN_MATERIAL = new THREE.MeshPhysicalMaterial({
  // color: 0xe3974d,
  color: 0x6c784a,
  emissive: 0xff2d00,
  flatShading: true,
  roughness: 0.5,
  reflectivity: 1.
})