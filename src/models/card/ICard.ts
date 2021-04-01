import { ICardEffect } from "src/effects";
import { CARD_TAG, CARD_TYPE } from ".";

export interface ICard {
  readonly id?: number;
  readonly name?: string;
  readonly trigger?: number | number[];
  readonly cost: number;
  readonly type: CARD_TYPE;
  readonly tag: CARD_TAG;
  readonly effect?: ICardEffect;
}
