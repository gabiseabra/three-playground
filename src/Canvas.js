import * as THREE from 'three'

export class Canvas {
  get element() {
    return this.renderer.domElement
  }

  constructor(width, height, config) {
    this.config = config

    this.camera = new THREE.PerspectiveCamera(
      config.camera.fov,
      width / height,
      1,
      config.camera.far
    )

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true
    })

    this.setSize(width, height)
  }

  render(scene) {
    this.renderer.render(scene, this.camera)
  }

  setSize(width, height) {
    if (this.width === width && this.height === height) return

    this.width = width
    this.height = height

    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}
