import Dat from 'dat.gui';
import {addObject} from './properties'

export class GUI extends Dat.GUI {
  constructor({ scene }) {
    super()

    const terrain = scene.getObjectByName('terrain');
    const sun = scene.getObjectByName('sun');
    const sky = scene.getObjectByName('sky');
    const sunLight = scene.getObjectByName('sunLight');
    const cameraLight = scene.getObjectByName('cameraLight');

    addObject(this, 'Sun light', sunLight)
    addObject(this, 'Camera light', cameraLight)
    addObject(this, 'Terrain', terrain.material)
    addObject(this, 'Sky', sky.material)
    addObject(this, 'Sun', sun)
    addObject(this, 'Scene', scene)
  }
}