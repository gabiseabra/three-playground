import * as THREE from 'three'
import {MeshSurfaceSampler} from 'three/examples/jsm/math/MeshSurfaceSampler'
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils'
import {CloudMaterial} from '/materials/Cloud'
import {CapsuleBufferGeometry} from './CapsuleBufferGeometry'

const rand = (min, max) => min + Math.random() * (max - min)

const mkCapsule = (radius, height, detail) =>
  new CapsuleBufferGeometry(
    radius,
    radius,
    height,
    detail * Math.PI,
    (detail / 4) * height,
    detail,
    detail
  )

export class Clouds extends THREE.Mesh {
  constructor({
    radius = 50,
    height = 200,
    detail = 16,
    surfaceRadius,
    surfaceOffset = 0,
    count,
    ...opts
  } = {}) {
    const instance = mkCapsule(radius, height, detail)
    instance.rotateZ(Math.PI / 2)

    const geometries = []

    const material = new CloudMaterial({
      scale: 50,
      displacement: 50,
      shadowColor: 0x09a3cf,
      color: 0xffffff,
      transparent: true,
      ...opts
    })

    const surface = new THREE.SphereBufferGeometry(
      surfaceRadius,
      4,
      4,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2.6
    )

    const sampler = new MeshSurfaceSampler(
      new THREE.Mesh(surface, new THREE.MeshBasicMaterial())
    ).build()

    const P = new THREE.Vector3()
    const N = new THREE.Vector3()

    for (let i = 0; i < count; ++i) {
      sampler.sample(P, N)
      P.add(N.clone().multiplyScalar(rand(-1, 1) * surfaceOffset))

      const geom = instance.clone()
      const scale = rand(0.5, 1.5)

      geom.scale(scale, scale, scale)
      geom.lookAt(new THREE.Vector3(P.x, P.y, P.z))
      geom.translate(P.x, P.y, P.z)

      geometries.push(geom)
    }

    const geom = BufferGeometryUtils.mergeBufferGeometries(geometries)

    super(geom, material)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.rotateY(0.002)
  }

  getGUI() {
    return [[null, {target: this.material}]]
  }
}

export class Cloud extends THREE.Mesh {
  constructor({radius = 50, height = 200, detail = 16, ...opts} = {}) {
    const geometry = mkCapsule(radius, height, detail)
    geometry.rotateZ(Math.PI / 2)

    const material = new CloudMaterial({
      scale: 50,
      displacement: 50,
      shadowColor: 0x09a3cf,
      color: 0xffffff,
      transparent: true,
      ...opts
    })

    super(geometry, material)
  }

  getGUI() {
    return [[null, {target: this.material}]]
  }
}
