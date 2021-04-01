import { CARD_TAG, CARD_TYPE } from "./types";
import { CARDS } from "./id";
import { cardList } from "./Cards";
import { ICardEffect } from "../../effects";
import { ICard } from ".";

const defaultOptions = (): ICard => ({
  id: null,
  name: '',
  trigger: 0,
  cost: 0,
  type: 0,
  tag: null,
});


export class Card implements ICard {
  readonly id: number;
  readonly trigger: number | number[];
  readonly cost: number;
  readonly type: CARD_TYPE;
  readonly tag: CARD_TAG;
  readonly effect: ICardEffect;

  get name() {
    return CARDS[this.id];
  }

  constructor(options?: ICard) {
    const _options = { ...defaultOptions(), ...options };
    const { id, trigger, cost, type, tag, effect } = _options;
    this.id = id;
    this.trigger = trigger;
    this.cost = cost;
    this.type = type;
    this.tag = tag;
    this.effect = effect;
  }

  static create(id: CARDS): Card {
    return new Card({ ...cardList[id], id });
  }
}
