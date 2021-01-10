import * as THREE from 'three'
import getVertexData from 'three-geometry-data'
import {CloudMaterial} from '/materials/Cloud'
import {animateObject3D} from '/lib/animateObject3D'
import {RoundedBoxGeometry} from './RoundedBoxGeometry'
import {Vector3} from 'three'

export class Cloud extends THREE.Mesh {
  constructor({detail = 50} = {}) {
    const geometry = new CloudGeometry(400, 200, 200, 15, detail)
    const cmaterial = new CloudMaterial({
      scale: 50,
      displacement: 100,
      color: 0xff0000,
      reflectivity: 1,
      refractionRatio: 0
    })

    const xmaterial = new THREE.MeshLambertMaterial({
      reflectivity: 1,
      refractionRatio: 0
    })

    super(geometry, xmaterial)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.rotateZ(0.01)
  }
}

class CloudGeometry extends THREE.Geometry {
  constructor(height, radius, displacement, detail) {
    super()

    const center = rand(0.1, 0.9)

    const body = new THREE.CylinderGeometry(
      radius,
      radius,
      height - radius,
      Math.PI * detail,
      height * detail
    )
    this.merge(body)

    const topTip = new THREE.SphereGeometry(
      radius,
      10,
      3,
      0,
      Math.PI / 2,
      0,
      Math.PI / 2
    )
    const bottomTip = new THREE.SphereGeometry(
      radius,
      10,
      3,
      0,
      Math.PI / 2,
      0,
      Math.PI / 2
    )

    const tips = [
      topTip.clone(),
      topTip.clone(),
      bottomTip.clone(),
      bottomTip.clone()
    ]
    tips[0].rotateZ(Math.PI / 2)
    tips[0].translate(0, radius, 0)

    tips.forEach((t) => this.merge(t))

    this.mergeVertices()

    distort(this, center, rand(0.3, 1), displacement)
  }
}

const rand = (min, max) => min + Math.random() * (max - min)
const distort = (geom, center, scale, displacement) => {
  geom.computeBoundingBox()
  const {position: V, normal: N} = getVertexData(geom).attributes
  for (let i = 0; i < V.length; i++) {
    const vertex = V[i]
      .clone()
      .divide(geom.boundingBox.max)
      .multiplyScalar(scale)
    const normal = N[i]
    const uv = V[i].clone().divide(geom.boundingBox.max)
    const wave = Math.sin(vertex.x * 10 - vertex.z * 10)
    const weight = (uv.x + 1) / 2 - center
    const mass = 1 - THREE.MathUtils.smootherstep(Math.abs(weight), 0, 1)
    const n = mass * (1 / 3) * displacement + wave * (1 - mass)

    geom.vertices[i].add(normal.clone().multiplyScalar(n * displacement))
    geom.vertices[i].add(
      new THREE.Vector3(wave, wave, 0).multiplyScalar(displacement)
    )
  }
  geom.verticesNeedUpdate = true
}
