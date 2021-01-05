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


var cols = [{
  stop: 0,
  color: new THREE.Color(0xf7b000)
}, {
  stop: .25,
  color: new THREE.Color(0xdd0080)
}, {
  stop: .5,
  color: new THREE.Color(0x622b85)
}, {
  stop: .75,
  color: new THREE.Color(0x007dae)
}, {
  stop: 1,
  color: new THREE.Color(0x77c8db)
}];

export function setGradient(geometry, colors = cols, axis = 'y', reverse) {
  geometry.computeBoundingBox();

  var bbox = geometry.boundingBox;
  var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);

  var vertexIndices = ['a', 'b', 'c'];
  var face, vertex, normalized = new THREE.Vector3(),
    normalizedAxis = 0;

  for (var c = 0; c < colors.length - 1; c++) {

    var colorDiff = colors[c + 1].stop - colors[c].stop;

    for (var i = 0; i < geometry.faces.length; i++) {
      face = geometry.faces[i];
      for (var v = 0; v < 3; v++) {
        vertex = geometry.vertices[face[vertexIndices[v]]];
        normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[axis];
        if (reverse) {
          normalizedAxis = 1 - normalizedAxis;
        }
        if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop) {
          var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
          face.vertexColors[v] = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
        }
      }
    }
  }
}


