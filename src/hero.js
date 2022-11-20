

class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(config) {
    const { scene, x, y, texture, frame } = config
    super(scene.matter.world, x, y, texture, frame)
    this.scene = scene;
    this.x = x;
    this.y = y;

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

    // hero movement keys ( w, s, d, a )
    hero.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      left: Phaser.Input.Keyboard.KeyCodes.A,
    })
  }

  update() {

    // hero movement
    if (this.inputKeys.up.isDown) {
      this.y -= 1
    } else if (this.inputKeys.down.isDown) {
      this.y += 1
    } else if (this.inputKeys.left.isDown) {
      this.x -= 1
    } else if (this.inputKeys.right.isDown) {
      this.x += 1
    } else {

    }
  }

}

export default Hero;