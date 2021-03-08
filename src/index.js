import './styles.css'
import debounce from 'lodash.debounce'
import {GUI} from './lib/GUI'
import {Canvas} from './Canvas'
import {Scene} from './Scene'
import theme from './theme/config'
import Stats from 'three/examples/jsm/libs/stats.module'

function main() {
  const stats = new Stats()
  const canvas = new Canvas(window.innerWidth, window.innerHeight, theme)
  const scene = new Scene(canvas)
  const gui = new GUI(scene)

  gui.close()

  document.body.appendChild(stats.dom)
  document.body.appendChild(canvas.element)

  window.addEventListener(
    'resize',
    debounce(() => {
      canvas.setSize(window.innerWidth, window.innerHeight)
    }, 200)
  )

  function animate() {
    canvas.render(scene)
    stats.update()
    requestAnimationFrame(animate)
  }

  animate()
}

main()
