import * as THREE from 'three'

const ANGLE = Symbol('ANGLE')

export class CameraController extends THREE.Object3D {
  rotation = Math.PI
  axis = new THREE.Vector3(1, 0, 1)

  constructor(camera, config) {
    super()

    const cameraLight = config.lights.camera
    camera.add(cameraLight)
    camera.position.y = 50
    this.add(camera)
    this.camera = camera
  }

  get angle() {
    return this[ANGLE]
  }

  set angle(a) {
    this[ANGLE] = a
    this.cameraAngle = THREE.MathUtils.lerp(
      Math.PI - this.rotation,
      this.rotation,
      a / Math.PI
    )

    this.updateAngle()
  }

  updateAngle() {
    const r = this.axis.clone().multiplyScalar(this.cameraAngle)
    if (this.axis.x) this.camera.rotation.x = r.x
    if (this.axis.y) this.camera.rotation.y = r.y
    if (this.axis.z) this.camera.rotation.z = r.z
  }
}
