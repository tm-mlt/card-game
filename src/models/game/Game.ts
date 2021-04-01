import { CARDS, Card, ICard, CARD_ACTIVATION_ORDER, CARD_TYPE } from "../card";
import { IPlayer, Player } from "../player/";
import { EVENTS } from "./events";
import type { IDice } from "../Dice/IDice";
import { GetCoinsFromOneToActivePlayer, ICardEffect } from "../../effects";
import { loopIndices } from "../../lib/math";

interface EffectContext {
  player: IPlayer,
  card: ICard,
}

const START_TURN = 1;

export declare interface Game {
  on(event: EVENTS, cb: (game: Game) => void);
  on(event: EVENTS.END, cb: (game: Game) => void);
  on(event: EVENTS.START, cb: (game: Game) => void);
  on(event: EVENTS.END, cb: (game: Game) => void);
  on(event: EVENTS.RESTART, cb: (game: Game) => void);
  on(event: EVENTS.TURN_START, cb: (game: Game) => void);
  on(event: EVENTS.TURN_FINISH, cb: (game: Game) => void);
  on(event: EVENTS.PLAYERS_SHUFFLE, cb: (game: Game) => void);
  on(event: EVENTS.PLAYERS_CHANGE, cb: (game: Game) => void);
  on(event: EVENTS.STATE_CHANGE, cb: (game: Game) => void);
  on(event: EVENTS.AWAITING_CARD_SELECTION, cb: (selectCard: Function) => void);
  on(event: EVENTS.AWAITING_PLAYER_SELECTION, cb: (context: { effect: ICardEffect }) => void);

  emit(event: EVENTS, game: Game);
  emit(event: EVENTS, selectCard: (c: Card) => void);
  emit(event: EVENTS, context: any);
}

export class Game extends Phaser.Events.EventEmitter {
  private _players: Array<IPlayer> = [];
  private _turn = START_TURN;
  private _player: IPlayer;
  private _dice: IDice<number[]>;

  get dice() {
    return this._dice;
  }

  get activePlayer() {
    return this._player;
  }

  get players() {
    return this._players;
  }

  constructor() {
    super();
  }

  get playerIndex() {
    return this.players.findIndex((player) => player === this.activePlayer);
  }

  get nextPlayer() {
    return this.getPlayerWithOffset(1);
  }

  get prevPlayer() {
    return this.getPlayerWithOffset(-1);
  }

  get turn() {
    return this._turn;
  }

  getPlayerWithOffset(offset: number = 1) {
    return this.players[loopIndices(this.playerIndex + offset, this.players.length)];
  }

  *getPlayersBackwards(index: number): Generator<IPlayer, null> {
    const l = this.players.length + 1;
    let i = 1;
    while (i <= l) {
      const j = index - i;
      yield this.players[loopIndices(j, this.players.length)];
      i++;
    }
    return null;
  }

  addPlayers(player: IPlayer);
  addPlayers(players: Array<IPlayer>);
  addPlayers(player: IPlayer | Array<IPlayer>) {
    if (player instanceof Array) {
      this._players.push(...player);
      return;
    }
    this._players.push(player);
  }

  removePlayers(player: Array<Player>) {
    throw new Error("Method not implemented");
  }x

  private prepareGame() {
    this.players.forEach((player) => {
      player.balance.clear();
      player.clearCards();
      player.addCards([
        Card.create(CARDS.WHEAT_FIELD),
        Card.create(CARDS.BAKERY),
        Card.create(CARDS.TV_STATION),
      ]);
    });
  }

  start(restart: boolean = false) {
    this.prepareGame();
    console.log(this);
    if (restart) {
      this._turn = START_TURN;
      this.emit(EVENTS.RESTART, this);
    }
    this.setActivePlayer(this.players[0]);
    this.emit(EVENTS.PLAYERS_CHANGE, this);

    this.emit(EVENTS.START, this);
  }

  setActivePlayer(player: IPlayer) {
    this._player = player;
  }

  rollDice(dice: IDice<any>) {
    setTimeout(() => this.emit(EVENTS.DICE_ROLL, this), 0);
    this._dice = dice;
    this.dice.roll();
    return this.dice;
  }

  // TODO: refactor
  async executeEffect({ player, card }: EffectContext) {
    console.log(`${player.name}: ${card.name} on ${card.trigger}`);

    if ("effect" in card && typeof card.effect !== "undefined") {
      if(false && card.effect instanceof GetCoinsFromOneToActivePlayer) {
        const effect = card.effect;
        await new Promise<void>((resolve, reject) => {
          this.emit(EVENTS.AWAITING_PLAYER_SELECTION, { effect, player });
        });
      }
      return await card.effect.execute(this, player);
    }
  }

  async endTurn() {
    console.group("roll");
    console.log(this.dice.last);
    console.log("================================");
    this.emit(EVENTS.TURN_START, this);

    type a = {
      [key in CARD_TYPE]?: keyof typeof CARD_TYPE;
    };
    const cardPriority: a = {};
    for (const k in CARD_ACTIVATION_ORDER) {
      cardPriority[k] = CARD_ACTIVATION_ORDER[k];
    }
    const c = CARD_ACTIVATION_ORDER;

    const players = this.getPlayersBackwards(this.playerIndex);
    let playerIterator = players.next();
    while (!playerIterator.done) {
      playerIterator = players.next();
      const player: IPlayer = playerIterator.value;
      if (player === null) {
        continue;
      }
      const cards = [...player.cards].sort(
        (a, b) => c.indexOf(a.type) - c.indexOf(b.type)
      );

      let multipleTriggers = false;

      for await (const card of cards) {
        if (card.type === CARD_TYPE.LANDMARK) {
          continue;
        }

        multipleTriggers = Array.isArray(card.trigger);

        if (
          multipleTriggers &&
          !(card.trigger as Array<number>).includes(this.dice.value)
        ) {
          continue;
        }

        if (!multipleTriggers && card.trigger !== this.dice.value) {
          continue;
        }

        await this.executeEffect({ player, card });
      }
    }
    console.groupEnd();

    this._turn += 1;
    this.setActivePlayer(this.nextPlayer);
    this.emit(EVENTS.TURN_FINISH, this);
    return;
  }

  shufflePlayers() {
    Phaser.Utils.Array.Shuffle(this.players);
    this.emit(EVENTS.PLAYERS_SHUFFLE, this);
    this.emit(EVENTS.PLAYERS_CHANGE, this);
  }

  waitForInput() {
    return new Promise<IPlayer>(resolve => {
      this.once(EVENTS.PLAYER_SELECT, resolve);
    });
  }
}
