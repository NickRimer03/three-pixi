import * as THREE from "three";
import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { sizes, buttonData, lightAnimationData } from "./utils/config";
import stats from "./utils/stats.js";
import resizeScene from "./utils/resize";
import box from "./objects/3d/box";
import floor from "./objects/3d/floor";
import lights from "./objects/3d/lights";
import Label from "./objects/2d/Label";
import Button from "./objects/2d/Button";

import "/style/style.css";

const { width, height } = sizes;
const { buttonRect, buttonStyle, textStyle } = buttonData;
const canvas: HTMLCanvasElement = document.querySelector("#webgl");

const gui = new dat.GUI();

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Objects
 */
scene.add(box);
scene.add(floor);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1.5, 1.5, 2.5);
camera.lookAt(box.position);
scene.add(camera);

/**
 * 3D Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Fog
 */
const fog = new THREE.Fog(0x262837, 1, 15);
scene.fog = fog;

/**
 * Lights
 */
const [ambientLight, directionalLight, ghost1, ghost2, ghost3] = lights;
for (const light of lights) {
  scene.add(light);
}

gui.add(ambientLight, "intensity").min(0).max(1).step(0.001).name("Amb. Intensity");
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001).name("Dir. Intensity");
gui.add(ghost1, "intensity").min(0).max(10).step(0.01).name("g1 Intensity");
gui.add(ghost2, "intensity").min(0).max(10).step(0.01).name("g2 Intensity");
gui.add(ghost3, "intensity").min(0).max(10).step(0.01).name("g3 Intensity");

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * 2D - PIXI
 */
const opts = {
  backgroundAlpha: 1,
  antialias: true,
  // resolution: window.devicePixelRatio,
  view: canvas,
};
const scene2D = new PIXI.Container();
const canvas2D = PIXI.autoDetectRenderer({ width, height, ...opts });
canvas2D.backgroundColor = 0x262837;

const texture3D = PIXI.Texture.from(renderer.domElement);
const sprite3D = new PIXI.Sprite(texture3D);
scene2D.addChild(sprite3D);

/**
 * 2D UI Objects
 */
let isAnimating = false;
let isJumping = false;

// Label
const label = new Label("PIXI Canvas", textStyle as PIXI.TextStyle);
label.draw();
scene2D.addChild(label.render);

// Controls
const controlButtons = [];
for (const { textLabel, dx, dy } of buttonData.data) {
  const button = new Button(
    textLabel,
    buttonStyle,
    { ...textStyle, fill: 0xff0000 } as PIXI.TextStyle,
    buttonRect
  );
  button.draw();

  scene2D.addChild(button.render);

  // @ts-ignore
  button.render.interactive = true;
  // @ts-ignore
  button.render.on("pointerdown", () => {
    if (!isAnimating) {
      gsap.to(box.position, {
        x: box.position.x + (dx ?? 0),
        y: box.position.y + (dy ?? 0),
        duration: 0.5,
        onStart: () => {
          isAnimating = true;
        },
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  });

  controlButtons.push(button);
}

// Jump
const jump = new Button(
  "JUMP",
  { backgroundColor: 0xffff00, borderColor: 0xff0000 },
  { ...textStyle, fill: 0xff00ff } as PIXI.TextStyle,
  buttonRect
);
jump.draw();
scene2D.addChild(jump.render);

// @ts-ignore
jump.render.interactive = true;
// @ts-ignore
jump.render.on("pointerdown", () => {
  if (!isJumping && !isAnimating) {
    const animation = gsap.to(box.position, {
      y: box.position.y + 4,
      duration: 1,
      onStart: () => {
        isJumping = true;
        isAnimating = true;
      },
      onComplete: () => {
        animation.reverse();
      },
      onReverseComplete: () => {
        isJumping = false;
        isAnimating = false;
      },
    });
    gsap.to(box.rotation, {
      x: box.rotation.x + Math.PI * 2,
      y: box.rotation.y + Math.PI * 2,
      ease: "linear",
      duration: 0.5,
      repeat: 3,
    });
  }
});

// Lights off
const lightsOff = new Button(
  "LIGHTS",
  { backgroundColor: 0xff00ff, borderColor: 0xffff00 },
  { ...textStyle, fill: 0x00ffff } as PIXI.TextStyle,
  buttonRect
);
lightsOff.draw();
scene2D.addChild(lightsOff.render);

let boxMaterial = new THREE.MeshNormalMaterial();
let floorMaterial = new THREE.MeshBasicMaterial();
// @ts-ignore
lightsOff.render.interactive = true;
// @ts-ignore
lightsOff.render.on("pointerdown", () => {
  // @ts-ignore
  [boxMaterial, box.material] = [box.material, boxMaterial];
  // @ts-ignore
  [floorMaterial, floor.material] = [floor.material, floorMaterial];
  for (const ghost of [ghost1, ghost2, ghost3]) {
    ghost.visible = !ghost.visible;
  }
  directionalLight.visible = !directionalLight.visible;
});

/**
 * Resize
 */
resizeScene(camera, renderer, canvas2D, { label, controlButtons, jump, lightsOff });

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas2D.view);
controls.enableDamping = true;
controls.minDistance = 0.8;
controls.maxDistance = 6;

/**
 * Tick
 */
const clock = new THREE.Clock();

function tick(): void {
  stats.begin();

  const elapsedTime = clock.getElapsedTime();

  // Update box
  if (!isJumping) {
    const angle = elapsedTime * 0.15;
    box.rotation.set(angle, angle, angle);
  }

  // Update lights
  const lights = [ghost1, ghost2, ghost3];
  for (const [i, { ka, kx1, kx2, ky1, ky2, kz1, kz2, x, y, z }] of lightAnimationData.entries()) {
    const angle = elapsedTime * ka;
    lights[i].position.x = Math.cos(angle) * (kx1 + x * Math.sin(elapsedTime * kx2));
    lights[i].position.z = Math.sin(angle) * (kz1 + y * Math.sin(elapsedTime * kz2));
    lights[i].position.y = Math.sin(elapsedTime * ky1) + z * Math.sin(elapsedTime * ky2);
  }

  // Update renderer
  renderer.render(scene, camera);
  sprite3D.texture.update();
  canvas2D.render(scene2D);

  // Update controls
  controls.update();

  window.requestAnimationFrame(tick);

  stats.end();
}

tick();
