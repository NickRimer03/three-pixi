import * as THREE from "three";

// Ambient
const ambientLight = new THREE.AmbientLight(0xb9b5ff, 0.3);

// Directional
const directionalLight = new THREE.DirectionalLight(0xb9b5ff, 0.7);
directionalLight.position.set(4, 5, -2);
directionalLight.castShadow = true;

// Will-o'-the-wisps
const ghost1 = new THREE.PointLight(0xff00ff, 2.5, 5);
const ghost2 = new THREE.PointLight(0x00ffff, 2.5, 5);
const ghost3 = new THREE.PointLight(0xffff00, 2.5, 5);

// Shadow maps
for (const ghost of [ghost1, ghost2, ghost3]) {
  ghost.castShadow = true;
  //
  ghost.shadow.mapSize.width = 256;
  ghost.shadow.mapSize.height = 256;
  ghost.shadow.camera.far = 7;
}

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.far = 16;

export default [ambientLight, directionalLight, ghost1, ghost2, ghost3];
