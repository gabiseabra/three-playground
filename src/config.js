import * as THREE from "three";

// constants
export const DEG = Math.PI / 180;

// perspective
export const CAM_FOV = 75;
export const CAM_NEAR = 35;
export const CAM_FAR = 100;
export const CAM_DELTA = CAM_FAR - CAM_NEAR;
export const Z0 = 5;

// object's apearance
export const MATERIAL = new THREE.MeshNormalMaterial();
