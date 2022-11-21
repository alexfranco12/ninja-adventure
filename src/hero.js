import { createAnimations } from './animations.js'

class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(config) {
    const { scene, x, y, texture, frame } = config
    super(scene.matter.world, x, y, texture, frame)
    this.scene = scene;
    this.name = 'hero'

    this.init(this)
  }

  static preload(scene) {
    scene.load.spritesheet('hero', './src/assets/Actor/Characters/GreenNinja/SpriteSheet.png', {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 28
    });

    scene.keys = scene.input.keyboard.addKeys('W, S, A, D');
  }

  init(hero) {
    this.scene.add.existing(hero)

    // hero properties
    this.setOrigin(.5, 1)
    this.setDepth(2)

    // hero movement keys ( w, s, d, a )
    hero.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      left: Phaser.Input.Keyboard.KeyCodes.A,
    })

    // Animation set
    createAnimations(this.scene.anims, this.name)
  }

  update() {

    // hero movement
    if (this.inputKeys.up.isDown) {
      this.y -= 1
      this.play(`${this.name}-walk-up`, true)
    } else if (this.inputKeys.down.isDown) {
      this.y += 1
      this.play(`${this.name}-walk-down`, true)
    } else if (this.inputKeys.left.isDown) {
      this.x -= 1
      this.play(`${this.name}-walk-left`, true)
    } else if (this.inputKeys.right.isDown) {
      this.x += 1
      this.play(`${this.name}-walk-right`, true)
    } else {
      this.stop()
    }
  }

}

export default Hero;