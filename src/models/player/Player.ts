import { ICard } from "../card";
import { IBalance, Balance } from "../balance/";
import { IPlayer } from "./IPlayer";

const defaultOptions = () => ({
  name: 'Player',
  balance: new Balance(),
  cards: [],
} as unknown as IPlayer)

export class Player implements IPlayer {
  private _cards: Array<ICard>;

  name: string;
  balance: IBalance;

  get cards() {
    return this._cards;
  }

  constructor(options: IPlayer) {
    const _options = Object.assign({}, defaultOptions(), options);
    this.name = _options.name;
    this.balance = _options.balance;
    this._cards = _options.cards;
  }

  addCards(cards: ICard);
  addCards(cards: Array<ICard>);
  addCards(cards: ICard | Array<ICard>) {
    if(Array.isArray(cards)) {
      this._cards.push(...cards);
      return;
    }
    this._cards.push(cards);
  }

  removeCards(cards: ICard);
  removeCards(cards: Array<ICard>);
  removeCards(cards: ICard | Array<ICard>) {
    if(Array.isArray(cards)) {
      const temp = [...this._cards];
      this._cards.splice(0);
      this._cards.push(...temp.filter(card => cards.includes(card)));
      return;
    }
    this._cards.splice(this._cards.indexOf(cards as ICard), 1);
  }

  clearCards() {
    this._cards = [];
  }
}