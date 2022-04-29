import * as THREE from "three";
import textures from "../../utils/textures";

const {
  bricksColorTexture,
  bricksAmbientOcclusionTexture,
  bricksNormalTexture,
  bricksRoughnessTexture,
} = textures.bricks;

const box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
box.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(box.geometry.attributes.uv.array, 2)
);

box.castShadow = true;

export default box;
