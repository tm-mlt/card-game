import Phaser from "phaser";
import { config } from "./config";
import { SCENES } from "./scenes";

const game = new Phaser.Game(config);

(window as any).game = game;
game.scene.start(SCENES.TEST.TABLE);
