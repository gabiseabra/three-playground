import * as THREE from "three";

// constants
export const DEG = Math.PI / 180;

// perspective
export const CAM_FOV = 45;
export const CAM_NEAR = 50;
export const CAM_FAR = 10000;
export const CAM_DELTA = CAM_FAR - CAM_NEAR;
export const Z0 = 0;
export const Z1 = 50;

// object's apearance
export const MATERIAL = new THREE.MeshLambertMaterial({
  // color: 0xed5882,
  vertexColors: THREE.VertexColors,
  flatShading: true,
  dithering: true,
  // emissive: 0x000000,
  color: 0xf79b5e,
  emissiveIntensity: .5,
})
