import './styles.css'
import debounce from 'lodash.debounce'
import {GUI} from '/lib/GUI'
import {Canvas} from '/Canvas'
import {Effects} from '/theme/Effects'
import theme from '/theme/config'

function main() {
  const canvas = new Canvas(window.innerWidth, window.innerHeight, theme)
  const gui = new GUI(canvas)
  const composer = new Effects(canvas)

  if (process.NODE_ENV == 'production') gui.close()

  document.body.appendChild(canvas.element)

  window.addEventListener(
    'resize',
    debounce(() => {
      canvas.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }, 200)
  )

  function animate() {
    composer.render()
    requestAnimationFrame(animate)
  }

  animate()
}

main()
