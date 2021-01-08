import * as THREE from 'three'

export const pivot = (obj) => {
  const pivot = new THREE.Object3D()
  pivot.add(obj)
  pivot.name = `${obj.name}Pivot`
  return pivot
}
