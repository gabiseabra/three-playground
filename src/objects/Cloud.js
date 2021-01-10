import * as THREE from 'three'
import getVertexData from 'three-geometry-data'
import {CloudMaterial} from '/materials/Cloud'
import mkCSG from 'three-js-csg'
import {animateObject3D} from '/lib/animateObject3D'
import {RoundedBoxGeometry} from './RoundedBoxGeometry'
import {Vector3} from 'three'

const CSG = mkCSG(THREE)

export class Cloud extends THREE.Mesh {
  constructor({detail = 10} = {}) {
    // const material = new CloudMaterial({
    //   scale: 50,
    //   displacement: 50,
    //   color: 0xf0f0f0
    // })
    super()
    const material = new THREE.MeshBasicMaterial({wireframe: true})
    const mesh = mkCloudShape(200, 300, 200, detail, material)

    this.add(mesh)

    animateObject3D(this, mesh)

    this.clock = new THREE.Clock()
  }

  onBeforeRender() {
    this.rotateZ(0.005)
  }
}

function mkCloudShape(width, height, depth, detail, material) {
  const base = new RoundedBoxGeometry(
    width,
    height / 4,
    depth,
    height / 8,
    detail,
    detail,
    detail,
    detail / 2
  )
  const s = Math.random()
  const {position: V, normal: N} = getVertexData(base).attributes
  for (let i = 0; i < V.length; i++) {
    const vertex = V[i].divideScalar(width * 0.75 + s * depth)
    const normal = N[i]
    const n = Math.sin(vertex.x * 10 + vertex.z * 10) * 5
    base.vertices[i].add(normal.multiplyScalar(n))
  }
  base.verticesNeedUpdate = true
  let csg = new CSG(base)

  let h = 0,
    y = 0
  for (let i = 0; i < 5 && h < height; ++i) {
    const r = height * 0.15 + Math.random() * height * 0.15
    const sy = 0.5 + Math.random() * 0.2
    const geom = new THREE.TetrahedronGeometry(r, detail / 2)
    geom.scale(1, sy, 1)
    const pos = new Vector3(
      sign() * Math.random() * r,
      (Math.random() * r) / 2,
      sign() * Math.random() * r
    )
    y += pos.y
    h = y + r
    geom.translate(pos.x, y, pos.z)
    csg = csg.union(new CSG(geom))
  }

  const mesh = csg.toMesh()
  mesh.material = material

  return mesh
}

const sign = () => (Math.random() > 0.5 ? 1 : -1)
