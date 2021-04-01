import { UI, TEST } from "./scenes";

export const config: Phaser.Types.Core.GameConfig = {
  scene: [
    {},
    new TEST.Table(),
  ],
  scale: {
    expandParent: true,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
};