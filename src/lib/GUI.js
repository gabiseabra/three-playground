import * as THREE from 'three'
import Dat from 'dat.gui';
import get from 'lodash.get'
import set from 'lodash.set'

const addProperty = (gui, obj) => ({prop, name = prop.split('.').pop(), ...args}) => {
  const val = get(obj, prop)
  if (val instanceof THREE.Color) {
    const hex = '#' + val.getHexString()
    gui.addColor({[name]: hex}, name).onChange((x) => {
      obj[prop].set(x)
    })
  } else if (val instanceof THREE.Vector3) {
    console.log(val)
  } else if (val instanceof THREE.Uniform) {
    addProperty(gui, val)({
      prop: 'value',
      name,
      ...args
    })
  } else {
    gui.add({[name]: val}, name, args.min, args.max).onChange((x) => {
      set(obj, prop, x)
    })
  }
}

const lightProperties = (light) => {
  if (light instanceof THREE.PointLight)
    return [
      {prop: 'color'},
      {prop: 'intensity', min: 0, max: 1000},
      {prop:'distance', min:0, max: 10000},
      {prop:'decay', min:0, max: 100}
    ]
  if (light instanceof THREE.HemisphereLight)
    return [
      {prop: 'color'},
      {prop: 'groundColor'},
      {prop: 'intensity', min: 0, max: 10}
    ]
  if (light instanceof THREE.AmbientLight)
    return [
      {prop: 'color'},
      {prop: 'intensity', min: 0, max: 10}
    ]
  if (light instanceof THREE.DirectionalLight)
    return [
      {prop: 'color'},
      {prop: 'intensity', min: 0, max: 10}
    ]
}

function addLight(gui, name, light) {
  const folder = gui.addFolder(name)
  lightProperties(light).forEach(addProperty(folder, light))
}

const materialProperties = (material) => {
  if (material.getGUI) return material.getGUI()
  return [
    {prop: 'color'},
    {prop: 'emissive'},
    {prop: 'emissiveIntensity', min: 0, max: 1}
  ]
}

function addMaterial(gui, name, material) {
  const folder = gui.addFolder(name)
  materialProperties(material).forEach(addProperty(folder, material))
}

export function mkGUI({ scene, camera }) {
  var gui = new Dat.GUI();

  const worldLight = scene.getObjectByName('light')
  const cameraLight = camera.getObjectByName('light')
  const terrain = scene.getObjectByName('terrain');
  const sky = scene.getObjectByName('sky');

  addLight(gui, 'Hemisphere light', worldLight.getObjectByName('hemisphere'))
  addLight(gui, 'Ambient light', worldLight.getObjectByName('ambient'))
  addLight(gui, 'Directional light', worldLight.getObjectByName('directional'))
  addLight(gui, 'Point light', worldLight.getObjectByName('point'))
  addLight(gui, 'Camera light', cameraLight.getObjectByName('point'))
  addMaterial(gui, 'Terrain', terrain.material)
  addMaterial(gui, 'Sky', sky.material)

  return gui
}