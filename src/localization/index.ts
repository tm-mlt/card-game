import { harbor } from "./harbor/en";
import { base } from "./base/en";
import { CARDS } from "src/models/card";


export const localization = {
  cards: {

  },
  ...Phaser.Utils.Objects.Extend(true, base, harbor)
}

export interface ICardLocalization {
  name: string;
  description: string;
}

export type CardLocalizationList = {
  [key in CARDS]?: ICardLocalization
}