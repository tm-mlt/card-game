import type { CARD_TYPE } from "src/models/card";

interface ITexture {
  key: string,
  path: string,
}

interface B {
  key: keyof typeof CARD_TYPE,
  path: string,
}

const TEXTURES = 'textures';
const TYPES = `${TEXTURES}/type-backgrounds`;

const typesPath = (p: string) => `${TYPES}/${p}`;

const PATHS = {
  TEXTURES,
  TYPES,
}

type CardTypeTexture = {
  [key in CARD_TYPE]?: ITexture
}

type T<K> = {
  [key in keyof K]?: B
}

const A:T<typeof CARD_TYPE> = {
  LANDMARK: {
    key: "LANDMARK",
    path: 'test',
  }
}


export enum TextureKeys {
  // types
  BG_PRIMARY_INDUSTRY = 'bg-primary-industry',
  BG_SECONDARY_INDUSTRY = 'bg-secondary-industry',
  BG_MAJOR_ESTABLISHMENT = 'bg-major-establishment',
  BG_LANDMARK = 'bg-landmark',
  BG_RESTAURANT = 'bg-restaurant',

  CARD_MASK ='card-mask',
  DICE = 'dice',
  CARD_A ='card-a',
  CARD_B ='card-b',
  CARD_SVG ='card-svg',
}

type TextureList = {
  [key in TextureKeys]?: ITexture
}

const texture = (key: TextureKeys, path: string) => {
  return {
    [key]: {
      key,
      path,
    }
  }
};

export const Textures: TextureList = {
  // types
  ...texture(TextureKeys.BG_PRIMARY_INDUSTRY, typesPath('primary-industry.svg')),
  ...texture(TextureKeys.BG_SECONDARY_INDUSTRY, typesPath('secondary-industry.svg')),
  ...texture(TextureKeys.BG_MAJOR_ESTABLISHMENT, typesPath('major-establishment.svg')),
  ...texture(TextureKeys.BG_LANDMARK, typesPath('landmark.svg')),
  ...texture(TextureKeys.BG_RESTAURANT, typesPath('restaurant.svg')),

  ...texture(TextureKeys.CARD_MASK, 'textures/card-mask.png'),
  ...texture(TextureKeys.DICE, 'textures/dice.png'),
  ...texture(TextureKeys.CARD_A, 'textures/cards/test_side-a.png'),
  ...texture(TextureKeys.CARD_B, 'textures/cards/test_side-b.png'),
  ...texture(TextureKeys.CARD_SVG, 'raw/forest.svg'),
}
