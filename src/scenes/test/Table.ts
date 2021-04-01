import { Card as CardView } from "../../views/Card/Card";
import { CARDS, Card as CardModel, Card, ICard } from "../../models/card";
import { ImageLoader } from "../../Loading/Loader";
import { TextureKeys } from "../../views/Textures/index";
import { IPlayer, Player } from "../../models/player";
import { EVENTS as GAME_EVENTS, Game } from "../../models/game/";
import { SCENES } from "../keys";
import { DoubleDice, SingleDice } from "../../models/dice";

interface ICommand {
  execute(): void;
}

abstract class AbstractRollDiceCommand implements ICommand {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract execute(): void;
}

class RollSingleDiceCommand extends AbstractRollDiceCommand {
  execute() {
    this.game.rollDice(new SingleDice());
  }
}

class RollDoubleDiceCommand extends AbstractRollDiceCommand {
  execute() {
    this.game.rollDice(new DoubleDice());
  }
}

export class Table extends Phaser.Scene {
  private _rollResult: number | string = 0;

  constructor(config?) {
    super({ key: SCENES.TEST.TABLE, ...config });
  }

  preload() {
    const loader = new ImageLoader(this.load);
    loader.load([
      TextureKeys.CARD_A,
      TextureKeys.CARD_B,
      TextureKeys.DICE,
      TextureKeys.CARD_MASK,
      TextureKeys.BG_PRIMARY_INDUSTRY,
    ]);
  }

  renderTestCards() {
    const center = {
      x: this.game.canvas.width * 0.5,
      y: this.game.canvas.height * 0.5,
    };

    [CARDS.WHEAT_FIELD, CARDS.RANCH, CARDS.BAKERY].forEach((id, index) => {
      let svg = false;
      if (index === 0) {
        svg = true;
      }
      const card = new CardView(
        this,
        150 + 220 * index + 10 * index,
        center.y,
        {
          textures: {
            front: svg ? TextureKeys.BG_PRIMARY_INDUSTRY : TextureKeys.CARD_A,
            back: TextureKeys.CARD_B,
          },
        }
      );
      this.add.existing(card);

      card.setModel(Card.create(id));
      this.input.enableDebug(card, 0xff0000);
    });
  }

  create() {
    //this.renderTestCards();

    const game = new Game();
    game.addPlayers([
      new Player({ name: "Andrew" } as Player),
      new Player({ name: "John" } as Player),
      new Player({ name: "Olivia" } as Player),
      new Player({ name: "Victoria" } as Player),
    ]
    );
    const currentPlayer = this.add.text(30, 50, `Player's turn`);
    const currentTurn = this.add.text(30, 30, "current turn: 0");

    let canRollTwice = false;
    const mayRollTwoDice = (player: IPlayer) => {
      canRollTwice = player.cards.some(
        (card) => card.id === CARDS.TRAIN_STATION
      );
      return canRollTwice;
    };

    const rollResult = this.add.text(
      30,
      120,
      `${this._rollResult > 0 ? this._rollResult : ""}`,
      {
        align: "right",
      }
    );

    const rollTwo = this.add
      .text(140, 100, "roll two?")
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        const command = new RollDoubleDiceCommand(game);
        command.execute();
        const result = game.dice.last;
        this._rollResult = `${result[0]}x${result[1]}`;
      })
      .setVisible(false);

    const rollDice = this.add
      .text(30, 100, "roll")
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        const command = new RollSingleDiceCommand(game);
        if (canRollTwice) {
          command.execute();
          this._rollResult = game.dice.value;
          return;
        }
        const mayRollTwo = mayRollTwoDice(game.activePlayer);
        if (mayRollTwo) {
          rollDice.text = "roll one?";
          rollTwo.setVisible(true);
          return;
        }
        command.execute();
        this._rollResult = game.dice.value;
        rollResult.text = `${this._rollResult}`;
      });
    game.on(GAME_EVENTS.TURN_FINISH, () => {
      rollResult.text = "";
    });
    game.on(GAME_EVENTS.DICE_ROLL, () => {
      rollResult.text = `${this._rollResult}`;
      rollDice.text = "roll";
      rollTwo.setVisible(false);
      canRollTwice = false;
    });

    const endTurn = this.add
      .text(30, 80, "end turn")
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => game.endTurn());

    const restart = this.add
      .text(30, this.cameras.main.height - 100, "restart")
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => game.start(true));

    const playerList = this.add
      .text(this.cameras.main.width - 50, 60, "player lsit", {
        align: "right",
      })
      .setOrigin(1, 0);

    const shufflePlayers = this.add
      .text(this.cameras.main.width - 50, 30, "shuffle")
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => game.shufflePlayers());

    const playerCardsText = [];
    const playersTotal = game.players.length;
    for (let i = 1; i <= playersTotal; i++) {
      const spacing = 250;
      const x = spacing * -0.5 + spacing * playersTotal * -0.5 + spacing * i;
      const cardText = this.add
        .text(this.cameras.main.width / 2 + x, 140, "cards")
        .setOrigin(0.5, 0);
      playerCardsText.push(cardText);
    }

    const renderCards = (g: Game) => {
      let text = [];
      g.players.forEach((player) => {
        const playerCards = player.cards.reduce(
          (acc, card: ICard) => (acc += `${card.name}: ${card.trigger}\n`),
          ""
        );
        text = [...text, `${player.name}\n-----------\n${playerCards}`];
      });

      for (let i in text) {
        playerCardsText[i].setText(text[i]);
      }
    };

    const updateView = (g: Game) => {
      currentPlayer.text = `${g.activePlayer.name}'s turn`;
      currentTurn.text = `Current turn: ${g.turn}`;
    };

    const updatePlayerList = (g: Game) =>
      (playerList.text = g.players
        .reduce(
          (list, { name, balance }) => [
            ...list,
            name === g.activePlayer.name
              ? `> ${name}: ${balance.value}`
              : `${name}: ${balance.value}`,
          ],
          []
        )
        .join("\n"));

    game.on(GAME_EVENTS.TURN_FINISH, updateView);
    game.on(GAME_EVENTS.START, updateView);
    game.on(GAME_EVENTS.RESTART, updateView);

    game.on(GAME_EVENTS.TURN_FINISH, updatePlayerList);
    game.on(GAME_EVENTS.RESTART, updatePlayerList);
    game.on(GAME_EVENTS.PLAYERS_CHANGE, updatePlayerList);

    game.on(GAME_EVENTS.AWAITING_CARD_SELECTION, (selectCard) => {
      throw new Error("Not implemented");
    });

    game.on(GAME_EVENTS.AWAITING_PLAYER_SELECTION, () => {
      throw new Error("Not implemented");
    });

    game.start();

    const fill = () => {
      const i = Math.ceil(Math.random() * 20 - 1);
      return CardModel.create(i);
    };

    for (const player of game.players) {
      for (const cards of Array.from(
        { length: Math.ceil(Math.random() * 10) },
        fill
      )) {
        player.addCards(cards);
      }
    }
    renderCards(game);
    game.players.forEach((player) => player.balance.give(10));
  }
}
