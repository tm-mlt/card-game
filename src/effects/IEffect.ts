import { ICard, CARD_TAG } from "src/models/card";
import { CARDS } from "src/models/card/id";
import type { Game } from "src/models/game";
import type { IPlayer } from "../models/player";

export interface ICardEffect {
  execute(game: Game, caller: IPlayer);
}

export interface ITargetable<T> {
  setTarget(T);
}

abstract class ChangeBalance implements ICardEffect {
  protected coins: number;
  constructor(coins) {
    this.coins = coins;
  }

  execute(game: Game, caller: IPlayer) {
    caller.balance.give(this.coins);
  }
}

export class AddCoinsToEveryone extends ChangeBalance {};

export class AddCoinsToActivePlayer extends ChangeBalance {
  execute(game: Game, caller: IPlayer) {
    if(game.activePlayer !== caller) {
      return;
    }
    caller.balance.give(this.coins);
  }
}

export class GetCoinsFromActivePlayer extends ChangeBalance {
  execute(game: Game, caller: IPlayer) {
    if(game.activePlayer === caller) {
      return;
    }
    
    const diff =  game.activePlayer.balance.take(this.coins);
    caller.balance.give(diff);
  }
}

export class GetCoinsFromEveryoneToActivePlayer extends ChangeBalance {
  execute(game: Game, caller: IPlayer) {
    if(game.activePlayer !== caller) {
      return;
    }

    game.players.reverse().forEach(player => {
      const diff = player.balance.take(this.coins);
      caller.balance.give(diff);
    });
  }
  
}

export class GetCoinsFromOneToActivePlayer extends ChangeBalance implements ITargetable<IPlayer> {
  private target: IPlayer;

  setTarget(target: IPlayer) {
    this.target = target;
  }

  async execute(game: Game, caller: IPlayer) {
    console.log('GetCoinsFromOneToActivePlayer begin');
    const target = await game.waitForInput();
    console.log(target);
    const diff = target.balance.take(this.coins);
    caller.balance.give(diff);
    console.log({ target, caller });
    return;
  }
}

export class ExchangeOneCard implements ICardEffect {
  private targetPlayer: IPlayer;
  private targetCard: ICard;
  private offerCard: ICard;

  constructor(targetPlayer: IPlayer, targetCard: ICard, offerCard: ICard){
    this.targetPlayer = targetPlayer;
    this.targetCard = targetCard;
    this.offerCard = offerCard;
  }

  execute(game: Game, caller: IPlayer) {
    this.targetPlayer.removeCards(this.targetCard);
    this.targetPlayer.addCards(this.offerCard);

    caller.removeCards(this.offerCard);
    caller.addCards(this.targetCard);
  }
}

export class AddCoinsForCardsOfTag extends ChangeBalance {
  private tag: CARD_TAG;
  constructor(coins: number, tag: CARD_TAG) {
    super(coins);
    this.tag = tag;
  }

  execute(game: Game, caller: IPlayer) {
    const total = caller.cards.filter(card => card.tag === this.tag).length;
    caller.balance.give(total * this.coins);
  }
}

export class AddCoinsForCardsOfId extends ChangeBalance {
  private id: CARDS;
  constructor(coins: number, id: CARDS) {
    super(coins);
    this.id = id;
  }

  execute(game: Game, caller: IPlayer) {
    const total = caller.cards.filter(card => card.id === this.id).length;
    caller.balance.give(total * this.coins);
  }
}
