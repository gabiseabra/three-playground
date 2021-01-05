import * as THREE from 'three'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2'
import Anton from '/fonts/Anton.json'

const mkFrontMaterial = (color) =>
  new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors,
    flatShading: true,
    dithering: true,
    color: color,
    emissive: color,
    emissiveIntensity: 0.5,
  })

const mkBackMaterial = (color) =>
  new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors,
    flatShading: true,
    dithering: true,
    color: color,
  })

const mkLineMaterial = () => {
  const material = new LineMaterial({
    color: 0xffffff,
    linewidth: 1.5
  })
  material.resolution.set(window.innerWidth, window.innerHeight)
  return material
}



const mkPolkaMaterial = () => {
  const texture = new THREE.TextureLoader().load('img/polka-dots.png');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(.5, .5)
  material.blending = THREE.CustomBlending
  material.blendDst = THREE.OneMinusSrcColorFactor
  material.blendSrc = THREE.OneFactor
  return material
}

export class RetroText extends THREE.Object3D {
  constructor(text, {
    color = 0xfc517c,
    size = 2,
    height = 0.4
  } = {}) {
    super()

    const plane = new THREE.TextBufferGeometry(text, {
      font: new THREE.Font(Anton),
      size,
      height: 0
    })
    const edges = new THREE.EdgesGeometry(plane)
    const outline = new LineSegmentsGeometry().setPositions(edges.attributes.position.array);

    const front = new THREE.TextGeometry(text, {
      font: new THREE.Font(Anton),
      size,
      height
    })
    const back = new THREE.TextGeometry(text, {
      font: new THREE.Font(Anton),
      size,
      height,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0.02
    })

    back.translate(0, 0, -0.01)
    plane.translate(0, 0, height + 0.5)
    edges.translate(0, 0, height + 0.51)

    const frontMaterial = mkFrontMaterial(color)
    const backMaterial = mkBackMaterial(color)
    const polkaMaterial = mkPolkaMaterial()
    const lineMaterial = mkLineMaterial()

    this.add(new THREE.Mesh(front, frontMaterial))
    this.add(new THREE.Mesh(back, backMaterial))
    this.add(new THREE.Mesh(plane, polkaMaterial))
    this.add(new LineSegments2(outline, lineMaterial))
  }
}