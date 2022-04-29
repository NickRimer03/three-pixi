import updateObjectsPosition from "./ui-objects";
import { PerspectiveCamera, WebGLRenderer } from "three";
import { AbstractRenderer } from "pixi.js";
import { sizes } from "./config";

/**
 * Resize canvas to fill viewport size
 */

let camera: PerspectiveCamera = null;
let renderer: WebGLRenderer = null;
let renderer2D: AbstractRenderer = null;
let gameObjects: Object = null;

function isGameLandscape(): boolean {
  return [0, 180].includes(
    screen.orientation ? screen.orientation.angle : window.innerWidth > window.innerHeight ? 90 : 0
  );
}

function getFactor(width: number, height: number, aspect: number): number {
  const isLandscape = isGameLandscape();
  const defaultWidth = 1366;
  const defaultHeight = 586;
  const defaultAspectRatio = defaultWidth / defaultHeight;

  if (isLandscape) {
    if (aspect <= defaultAspectRatio) {
      return width / defaultWidth;
    } else {
      return height / defaultHeight;
    }
  }

  // portrait
  if (aspect >= 1 / defaultAspectRatio) {
    return height / defaultWidth;
  } else {
    return width / defaultHeight;
  }
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  const { width, height } = sizes;
  const aspect = width / height;
  const factor = getFactor(width, height, aspect);

  // Update objects
  updateObjectsPosition(width, height, factor, gameObjects);

  // Update camera
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // Update 2D renderer
  renderer2D.resize(width, height);

  // Update renderer
  renderer.setSize(width, height);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

export default function resizeScene(
  gameCamera: PerspectiveCamera,
  gameRenderer: WebGLRenderer,
  game2DRenderer: AbstractRenderer,
  objects: Object
): void {
  camera = gameCamera;
  renderer = gameRenderer;
  renderer2D = game2DRenderer;
  gameObjects = objects;

  window.dispatchEvent(new Event("resize"));
}
