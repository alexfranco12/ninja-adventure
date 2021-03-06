import character from "./character.js";
import { createAnimations } from "../animations/heroAnims.js";

export default class Hero extends character {
  constructor(config) {
    const {scene, x, y, texture, frame} = config;
    super(scene, x, y, texture, frame)
    this.scene = scene;
    this.x = scene.area.tileToWorldX(x) + 8;
    this.y = scene.area.tileToWorldY(y) + 8;
    this.texture = texture;
    this.frame = frame;
    this.isPlayerControlled = true;
  }

  static preload(scene) {
    scene.load.spritesheet('hero', "/assets/actors/characters/GreenNinja/SpriteSheet.png", {
      frameWidth: 16,
      frameHeight: 16,
      endFrame: 28,
    });
  }

  addAnims(anims) {
    createAnimations(anims, this.sprite.id)
  }

  initializeEntity() {
    this.shadow = this.scene.add.image(this.x, this.y, 'shadow')
    this.sprite = this.scene.matter.add.sprite(this.x, this.y, this.texture, this.frame)

    // Person Collision and Sensor areas
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let personCollider = Bodies.circle(this.x, this.y, 6, {
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
    this.sprite.setExistingBody(compoundBody);
    this.sprite.setFixedRotation();

    this.sprite.id = `${this.texture}`;
    this.addAnims(this.sprite.anims);
  }
}