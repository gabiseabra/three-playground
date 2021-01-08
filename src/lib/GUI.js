import * as THREE from 'three'
import Dat from 'dat.gui';
import get from 'lodash.get'
import set from 'lodash.set'

const noop = () => null

const addProperty = (gui, obj, ctx) => ({
  prop,
  name = prop.split('.').pop(),
  onChange = noop,
  ...args
}) => {
  const val = get(obj, prop)
  if (val instanceof THREE.Color) {
    const hex = '#' + val.getHexString()
    gui.addColor({[name]: hex}, name).onChange((x) => {
      obj[prop].set(x)
      onChange(x, ctx)
    })
  } else if (val instanceof THREE.Uniform) {
    addProperty(gui, val)({
      prop: 'value',
      name,
      ...args
    })
  } else {
    gui.add({[name]: val}, name, args.min, args.max).onChange((x) => {
      set(obj, prop, x)
      onChange(x, ctx)
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

function addLight(gui, ctx, name, light) {
  const folder = gui.addFolder(name)
  lightProperties(light).forEach(addProperty(folder, light, ctx))
}

const materialProperties = (material) => {
  if (material.getGUI) return material.getGUI()
  return [
    {prop: 'color'},
    {prop: 'emissive'},
    {prop: 'emissiveIntensity', min: 0, max: 1}
  ]
}

function addMaterial(gui, ctx, name, material) {
  const folder = gui.addFolder(name)
  materialProperties(material).forEach(addProperty(folder, material, ctx))
}


function addObject(gui, ctx, name, obj) {
  const folder = gui.addFolder(name)
  obj.getGUI().forEach(addProperty(folder, obj, ctx))
}

export function mkGUI(ctx) {
  const { scene, camera } = ctx
  var gui = new Dat.GUI();

  const worldLight = scene.getObjectByName('light')
  const cameraLight = camera.getObjectByName('light')
  const terrain = scene.getObjectByName('terrain');
  const sky = scene.getObjectByName('sky');
  const sun = scene.getObjectByName('sun');

  addLight(gui, ctx, 'Hemisphere light', worldLight.getObjectByName('hemisphere'))
  addLight(gui, ctx, 'Ambient light', worldLight.getObjectByName('ambient'))
  addLight(gui, ctx, 'Directional light', worldLight.getObjectByName('directional'))
  addLight(gui, ctx, 'Point light', worldLight.getObjectByName('point'))
  addLight(gui, ctx, 'Camera light', cameraLight.getObjectByName('point'))
  addMaterial(gui, ctx, 'Terrain', terrain.material)
  addMaterial(gui, ctx, 'Sky', sky.material)
  addObject(gui, ctx, 'Sun', sun)

  return gui
}