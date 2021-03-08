import * as THREE from 'three'
import get from 'lodash.get'
import set from 'lodash.set'

const addProperty = (gui, obj) => ([name, opts = {}]) => {
  if (!opts.target) addValue(gui, obj, name, opts)
  else if (name) addObject(gui, name, opts.target)
  else getGUI(opts.target).forEach(addProperty(gui, opts.target))
}

const noop = () => null

function addValue(gui, obj, prop, opts = {}) {
  const {name = prop.split('.').pop(), onChange = noop} = opts
  const val = get(obj, prop)

  if (val instanceof THREE.Color) {
    const hex = '#' + val.getHexString()
    gui.addColor({[name]: hex}, name).onChange((x) => {
      val.set(x)
      onChange(x)
    })
  } else if (val instanceof THREE.Uniform) {
    addProperty(gui, val)(['value', {...opts, name}])
  } else {
    gui.add({[name]: val}, name, opts.min, opts.max).onChange((x) => {
      set(obj, prop, x)
      onChange(x)
    })
  }
}

export function getGUI(obj) {
  if (obj.getGUI) return obj.getGUI()
  // Materials
  if (obj instanceof THREE.MeshBasicMaterial) return [['color']]
  if (
    obj instanceof THREE.MeshStandardMaterial ||
    obj instanceof THREE.MeshLambertMaterial
  )
    return [['color'], ['emissive'], ['emissiveIntensity', {min: 0, max: 1}]]
  // Lights
  if (obj instanceof THREE.PointLight)
    return [
      ['color'],
      ['intensity', {min: 0, max: 1000}],
      ['distance', {min: 0, max: 10000}],
      ['decay', {min: 0, max: 100}]
    ]
  if (obj instanceof THREE.HemisphereLight)
    return [['color'], ['groundColor'], ['intensity', {min: 0, max: 10}]]
  if (obj instanceof THREE.AmbientLight)
    return [['color'], ['intensity', {min: 0, max: 10}]]
  if (obj instanceof THREE.DirectionalLight)
    return [['color'], ['intensity', {min: 0, max: 10}]]
}

export function addObject(gui, name, obj) {
  const folder = gui.addFolder(name)
  if (!obj) console.warn(`[GUI] ${name} doesn't exist`)
  else getGUI(obj).forEach(addProperty(folder, obj))
}
