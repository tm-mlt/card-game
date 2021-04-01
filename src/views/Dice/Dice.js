export class Dice extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, model = {}) {
    super(scene, x, y, 'dice');

    this.model = model;

    const angle = 15;
    const duration = 100;
    this.rollTimeline = this.scene.tweens.timeline({
      targets: this,
      loop: -1,
      paused: true,
      duration,
      ease: Phaser.Math.Easing.Elastic.InOut,
      tweens: [
        { angle: { start: 0, from: -angle, to: angle }, yoyo: true },
      ]
    });

    const textOffset = 20;
    this.hint = scene.add.text(
      x + this.width * 0.5 + textOffset,
      y - this.height * 0.5 - textOffset,
      'roll the dice',
      { fontSize: '20px' },
    );
    
    this.paused = false;
    this.rollTimeline.on('loop', () => {
      this.hint.text = this.model.last;
      this.rollTimeline.pause();
      this.paused = true;
      console.log(`complete ${this.model.last}`);
    });

    this.setInteractive();
    this.on('pointerdown', () => this.playRoll());
  }

  playRoll() {
    console.log('playing');
    this.model.roll();
    this.rollTimeline[this.paused ? 'resume' : 'play']();
  }

  update(time, delta) {

  }

  preUpdate() {

  }

  updateText() {
    
  }
}


Phaser.GameObjects.GameObjectFactory.register('dice', function (x, y, model)
{
  const dice = new Dice(this.scene, x, y, model);

  this.displayList.add(dice);
  this.updateList.add(dice);

  return dice;
});