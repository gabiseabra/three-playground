import "./styles.css";
import { App } from "./App";

function main() {
  const app = new App();

  document.body.appendChild(app.element);

  function animate() {
    app.render();
    requestAnimationFrame(animate);
  }

  animate();
}

main();
