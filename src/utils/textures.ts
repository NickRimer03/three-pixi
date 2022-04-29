import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// Bricks
const bricksColorTexture = textureLoader.load("/bricks/color.jpg");
const bricksNormalTexture = textureLoader.load("/bricks/normal.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load("/bricks/ambientOcclusion.jpg");
const bricksRoughnessTexture = textureLoader.load("/bricks/roughness.jpg");

// Grass
const grassColorTexture = textureLoader.load("/grass/color.jpg");
const grassNormalTexture = textureLoader.load("/grass/normal.jpg");
const grassAmbientOcclusionTexture = textureLoader.load("/grass/ambientOcclusion.jpg");
const grassRoughnessTexture = textureLoader.load("/grass/roughness.jpg");

for (const texture of [
  grassColorTexture,
  grassNormalTexture,
  grassAmbientOcclusionTexture,
  grassRoughnessTexture,
]) {
  texture.repeat.set(8, 8);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
}

export default {
  bricks: {
    bricksColorTexture,
    bricksNormalTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
  },
  grass: {
    grassColorTexture,
    grassNormalTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
  },
};
