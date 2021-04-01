import type { CARD_TYPE } from "src/models/card";
import { getTextureRecord } from "../type";

const PATH = "textures/type-backgrounds";

const getCardTypeTextureRecord = (key: keyof typeof CARD_TYPE, path: string) =>
  getTextureRecord<typeof CARD_TYPE>(key, `${PATH}/${path}`);

export const BACKGROUND = {
  ...getCardTypeTextureRecord("PRIMARY_INDUSTRY",'primary-industry.svg'),
  ...getCardTypeTextureRecord("SECONDARY_INDUSTRY",'secondary-industry.svg'),
  ...getCardTypeTextureRecord("MAJOR_ESTABLISHMENT",'major-establishment.svg'),
  ...getCardTypeTextureRecord("LANDMARK",'landmark.svg'),
  ...getCardTypeTextureRecord("RESTAURANT",'restaurant.svg'),
};

console.log(BACKGROUND);
