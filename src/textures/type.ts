import type { CARD_TYPE } from "src/models/card"

type TextureRecord<T> = {
  key: keyof T,
  path: string,
}

export type TextureList<T> = {
  [key in keyof T]: TextureRecord<T>
}

export function getTextureRecord<T>(key: keyof T, path: string) {
  return {
    [key]: {
      key,
      path,
    }
  } as TextureList<T>;
}

const cardTypeTextures: TextureList<typeof CARD_TYPE> = {
  ...getTextureRecord<typeof CARD_TYPE>("LANDMARK", 'textures/type-backgrounds/landmark.svg'),
}

function loadTexture<T>(list: TextureList<T>, key: keyof T) {
  return list[key];
}
function loadCardTypeTexture(key: keyof typeof CARD_TYPE) {
  return loadTexture<typeof CARD_TYPE>(cardTypeTextures, key);
}
