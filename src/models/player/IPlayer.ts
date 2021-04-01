import { ICard } from "src/models/card";
import { IBalance } from "../balance";

export interface IPlayer {
  name: string;
  balance?: IBalance;
  cards?: Array<ICard>;

  addCards(cards: ICard | Array<ICard>);
  removeCards(cards: ICard | Array<ICard>);
  clearCards();
}
