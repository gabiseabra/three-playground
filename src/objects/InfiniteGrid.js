// Author: Fyrestar https://mevedia.com (https://github.com/Fyrestar/THREE.InfiniteGridHelper)
import * as THREE from "three";

const VERTEX = `
varying vec3 worldPosition;

uniform float uDistance;

void main() {
  vec3 pos = position.xzy * uDistance;
  pos.xz += cameraPosition.xz;
  worldPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENT = `
#define LINE_THICKNESS 1.0

varying vec3 worldPosition;

uniform float uSize;
uniform vec3 uColor;
uniform float uDistance;

float getGrid(float size) {
  vec2 r = worldPosition.xz / size;
  vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
  float line = min(grid.x, grid.y);
  return LINE_THICKNESS - min(line, LINE_THICKNESS);
}

void main() {
  float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / uDistance, 1.0);
  float grid = getGrid(uSize);
  gl_FragColor = vec4(uColor.rgb, grid * pow(d, 3.0));
  if ( gl_FragColor.a <= 0.0 ) discard;
}
`;

export class InfiniteGrid extends THREE.Mesh {
  frustumCulled = false

  constructor() {
    const color = new THREE.Color(0xffa18c);
    const distance = 2000;
    const size = 10;

    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uSize: { value: size },
        uColor: { value: color },
        uDistance: { value: distance }
      },
      transparent: true,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      extensions: {
        derivatives: true
      }
    });
    super(geometry, material);
  }
}
