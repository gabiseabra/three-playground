import * as THREE from 'three'

const discardMaterial = new THREE.ShaderMaterial({
  fragmentShader: 'void main() { discard; }'
})

/**
 * Attach an Object3D's onBeforeRender method to one if it's children.
 *
 * @param {THREE.Object3D|THREE.Group} object
 * @param {THREE.Mesh|string} reference One of the object's children by name or reference.
 * @see https://github.com/mrdoob/three.js/issues/11306
 */
export function animateObject3D(object, reference) {
  let ref = reference
  if (!ref) {
    ref = new THREE.Mesh(new THREE.CircleGeometry(0.01), discardMaterial)
    object.add(ref)
  } else if (typeof ref == 'string') {
    ref = object.getObjectByName(ref)
  }
  const fn = ref.onBeforeRender
  ref.onBeforeRender = (...args) => {
    if (fn) fn(...args)
    object.onBeforeRender(...args)
  }
}
