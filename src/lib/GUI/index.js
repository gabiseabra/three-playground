import Dat from 'dat.gui';
import {addObject} from './properties'

export class GUI extends Dat.GUI {
  constructor({ scene }) {
    super()

    const terrain = scene.getObjectByName('terrain');
    const sun = scene.getObjectByName('sun');
    const sky = scene.getObjectByName('sky');
    const worldLight = scene.getObjectByName('worldLight');
    const sunLight = scene.getObjectByName('sunLight');
    const cameraLight = scene.getObjectByName('cameraLight');

    addObject(this, 'World light', worldLight)
    addObject(this, 'Sun light', sunLight)
    addObject(this, 'Camera light', cameraLight)
    addObject(this, 'Terrain', terrain)
    addObject(this, 'Sky', sky.material)
    addObject(this, 'Sun', sun)
    addObject(this, 'Scene', scene)
  }
}