
export default class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(config) {
    let {scene, x, y, texture, frame} = config;
    super(scene.matter.world, x, y, texture, frame);
    this.scene = config.scene;
    this.name = 'Hero';
    this.x = config.x;
    this.y = config.y;
    this.direction = config.direction || 'down'
    this.movingProgressRemaining = 0;

    this.directionUpdate = {
        "up" : ["y", -1],
      "down" : ["y",  1],
      "left" : ["x", -1],
     "right" : ["x",  1],
    }

    // Person Collision and Sensor areas
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let personCollider = Bodies.rectangle(this.x, this.y, 16, 16, {
        isSensor: false, 
        label: 'personCollider'
    })
    let personSensor = Bodies.circle(this.x, this.y, 12, {
        isSensor: true, 
        label: 'personSensor'
    })
    const compoundBody = Body.create({
        parts: [ personCollider, personSensor ],
        frictionAir: 0.00
    });

    // stops the person from rotating when interacted with
    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    // add entity to game
    this.scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.spritesheet('Hero', "/assets/actors/characters/GreenNinja/SpriteSheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 28,
    });
  }

  createAnimations() {
    this.anims.create({
      key: 'idle-down',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [0]
      }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'idle-up',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [1]
      }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'idle-left',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [2]
      }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'idle-right',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [3]
      }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [7, 11, 15]
      }),
      frameRate: 6,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [6, 10, 14]
      }),
      frameRate: 6,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [5, 9, 13]
      }),
      frameRate: 6,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers(this.name, {
        frames: [4, 8, 12]
      }),
      frameRate: 6,
      repeat: -1,
      yoyo: true,
    });
  }

  update(state) {
    this.updatePosition();

    if (this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
      this.anims.play(`walk-${this.direction}`, true)
    } else {
      this.anims.stop();
      this.anims.play(`idle-${this.direction}`, true)
    }
  }
}