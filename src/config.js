import * as THREE from "three";

// constants
export const DEG = Math.PI / 180

// scale
export const WORLD_RADIUS = 1500

// perspective
export const CAM_FOV = 45
export const CAM_NEAR = 50
export const CAM_FAR = WORLD_RADIUS * 5
export const CAM_DELTA = CAM_FAR - CAM_NEAR
export const Z0 = 0
export const Z1 = 50
